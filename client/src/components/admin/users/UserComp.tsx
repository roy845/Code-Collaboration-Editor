import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateUserFormValues,
  UpdateUserSchema,
} from "../../../schemas/updateUserSchema.schema";
import { UserResponseDto } from "../../../types/users.types";
import Spinner from "../../common/Spinner";
import { format } from "date-fns";
import Error from "../../Error";
import { FaArrowRight, FaUpload } from "react-icons/fa";
import useCustomNavigate from "../../../hooks/useCustomNavigate";
import RolesModal from "./RolesModal";

type UserCompProps = {
  userResponse: UserResponseDto | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: any;
  onSubmit: (data: UpdateUserFormValues) => void;
  onDelete: () => void;
};

const UserComp: React.FC<UserCompProps> = ({
  userResponse,
  isLoading,
  isUpdating,
  error,
  onSubmit,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<
    "Assign" | "Remove" | "Remove All"
  >("Assign");
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    userResponse?.user?.avatar
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const customNavigate = useCustomNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserFormValues>({
    resolver: zodResolver(UpdateUserSchema),
  });

  useEffect(() => {
    if (userResponse) {
      reset({
        username: userResponse?.user?.username || "",
        email: userResponse?.user?.email || "",
        roles: userResponse?.user?.roles || [],
        password: "",
      });
      setPreviewImage(userResponse?.user?.avatar);
    }
  }, [userResponse, reset]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="text-center mt-8">
        <Error
          error={
            error?.response?.data?.error
              ? error?.response?.data?.error
              : error?.response?.data?.message
          }
        />
      </div>
    );
  }

  const formatDate = (date: string | undefined): string => {
    if (!date) return "";
    try {
      return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
    } catch {
      return date;
    }
  };

  const handleFormSubmit = (data: UpdateUserFormValues) => {
    if (uploadedImage) {
      data.avatar = uploadedImage;
    }

    onSubmit(data);
  };

  return (
    <>
      <RolesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        action={modalAction}
        userId={userResponse?.user?._id as string}
      />

      <form
        className="bg-gray-800 p-6 rounded-lg"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <img
          src={previewImage}
          alt={`${userResponse?.user?.username}'s avatar`}
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-600"
        />
        <label
          htmlFor="avatar"
          className="cursor-pointer text-blue-400 hover:text-blue-200 flex items-center justify-center"
        >
          <FaUpload size={24} />
        </label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <div className="flex justify-end">
          <FaArrowRight
            className="cursor-pointer text-xl text-white mt-2"
            onClick={() => customNavigate("/admin/users")}
          />
        </div>
        <div>
          <label className="block text-white text-left">Username</label>
          <input
            type="text"
            placeholder="Enter new username"
            {...register("username")}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-white text-left">Email</label>
          <input
            type="text"
            placeholder="Enter new email"
            {...register("email")}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-white text-left">Roles</label>
          <input
            type="text"
            disabled
            {...register("roles")}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
          {errors.roles && (
            <p className="text-red-500 text-sm">{errors.roles.message}</p>
          )}
        </div>

        <div>
          <label className="block text-white text-left">Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            {...register("password")}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-white text-left">Created At</label>
          <input
            type="text"
            disabled
            value={formatDate(userResponse?.user?.createdAt)}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
        </div>

        <div>
          <label className="block text-white text-left">Updated At</label>
          <input
            type="text"
            disabled
            value={formatDate(userResponse?.user?.updatedAt)}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
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
            {isUpdating ? "Updating User..." : "Update User"}
          </button>
          <button
            type="button"
            className={
              "px-6 py-2 font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white"
            }
            onClick={onDelete}
          >
            Delete User
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
            onClick={() => {
              setModalAction("Assign");
              setIsModalOpen(true);
            }}
          >
            Assign Roles
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700"
            onClick={() => {
              setModalAction("Remove");
              setIsModalOpen(true);
            }}
          >
            Remove Roles
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
            onClick={() => {
              setModalAction("Remove All");
              setIsModalOpen(true);
            }}
          >
            Remove ALL Roles
          </button>
        </div>
      </form>
    </>
  );
};

export default UserComp;
