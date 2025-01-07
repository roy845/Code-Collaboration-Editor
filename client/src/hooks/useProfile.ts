import { toast } from "react-toastify";
import { API_URLS } from "../api/api-urls";
import { UpdateUserFormValues } from "../schemas/updateUserSchema.schema";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";
import { UserResponseDto } from "../types/users.types";
import useFetch from "./useFetch";
import { useState } from "react";

const useProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleUpdate = async (data: UpdateUserFormValues) => {
    try {
      setIsUpdating(true);
      await axiosPrivate.put(`${API_URLS.getAllUsers}/${userId}`, data);
      toast.success("User updated successfully!");
      navigate("/home");
    } catch (err) {
      toast.error("Failed to update the user.");
    } finally {
      setIsUpdating(false);
    }
  };

  const {
    data: userResponse,
    error,
    isLoading,
  } = useFetch<UserResponseDto>(`${API_URLS.getAllUsers}/${userId}`);

  return {
    data: userResponse,
    error,
    isLoading,
    isUpdating,
    handleUpdate,
  };
};

export default useProfile;
