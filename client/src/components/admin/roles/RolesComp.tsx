import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowRight } from "react-icons/fa";
import { RoleResponseDto } from "../../../types/roles.types";
import {
  UpdateRoleData,
  updateRoleSchema,
} from "../../../schemas/updateRole.schema";
import { useNavigate } from "react-router-dom";

type RoleCompProps = {
  roleResponseDto: RoleResponseDto | null;
  isUpdating: boolean;
  onSubmit: (data: UpdateRoleData) => void;
  onDelete: () => void;
};

const RoleComp: React.FC<RoleCompProps> = ({
  roleResponseDto,
  isUpdating,
  onSubmit,
  onDelete,
}) => {
  const customNavigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateRoleData>({
    resolver: zodResolver(updateRoleSchema),
  });

  useEffect(() => {
    if (roleResponseDto) {
      reset({
        name: roleResponseDto?.role?.name || "",
      });
    }
  }, [roleResponseDto, reset]);

  return (
    <>
      <form
        className="bg-gray-800 p-6 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-end">
          <FaArrowRight
            className="cursor-pointer text-xl text-white mt-2"
            onClick={() => customNavigate("/admin/roles")}
          />
        </div>
        <div>
          <label className="block text-white text-left">Role Name</label>
          <input
            type="text"
            placeholder="Enter new role name"
            {...register("name")}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="flex justify-center gap-4 py-4">
          {/* Submit Button */}
          <button
            type="submit"
            className={`px-6 py-2 font-semibold rounded-lg ${
              isUpdating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating Role..." : "Update Role"}
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete Role
          </button>
        </div>
      </form>
    </>
  );
};

export default RoleComp;
