import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../../api/api";
import { API_URLS } from "../../../api/api-urls";
import {
  CreateRoleData,
  RoleNameSchema,
} from "../../../schemas/addRole.schema";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useCustomNavigate from "../../../hooks/useCustomNavigate";
import { FaArrowRight } from "react-icons/fa";

const AddRoleComp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateRoleData>({
    resolver: zodResolver(RoleNameSchema),
  });

  const axiosPrivate = useAxiosPrivate();

  const customNavigate = useCustomNavigate();

  const onSubmit = async (data: CreateRoleData) => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.post(
        API_URLS.getAllRolesPaginated,
        data
      );
      toast.success(response.data.message || "Role created successfully!");
      reset();
      customNavigate("/admin/roles");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.error ||
          "Failed to create the role. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white max-w-lg mx-auto rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Add New Role</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-end">
          <FaArrowRight
            className="cursor-pointer text-xl text-white mt-2"
            onClick={() => customNavigate("/admin/roles")}
          />
        </div>

        <div>
          <label
            htmlFor="roleName"
            className="text-left block text-sm font-medium text-white"
          >
            Role Name
          </label>
          <input
            id="roleName"
            type="text"
            {...register("name")}
            placeholder="Enter role name"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
            isLoading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Role"}
        </button>
      </form>
    </div>
  );
};

export default AddRoleComp;
