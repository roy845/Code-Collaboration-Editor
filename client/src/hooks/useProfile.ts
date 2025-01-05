import { toast } from "react-toastify";
import { axiosPrivate } from "../api/api";
import { API_URLS } from "../api/api-urls";
import { UpdateUserFormValues } from "../schemas/updateUserSchema.schema";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";
import { UserResponseDto } from "../types/users.types";
import useFetch from "./useFetch";

const useProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const handleUpdate = async (data: UpdateUserFormValues) => {
    try {
      await axiosPrivate.put(`${API_URLS.getAllUsers}/${userId}`, data);
      toast.success("User updated successfully!");
      navigate("/home");
    } catch (err) {
      toast.error("Failed to update the user.");
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
    handleUpdate,
  };
};

export default useProfile;
