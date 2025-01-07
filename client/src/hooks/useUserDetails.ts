import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "./useAxiosPrivate";
import { API_URLS } from "../api/api-urls";
import useFetch from "./useFetch";
import { UserResponseDto } from "../types/users.types";
import { UpdateUserFormValues } from "../schemas/updateUserSchema.schema";

const useUserDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    data: userResponse,
    error,
    isLoading,
  } = useFetch<UserResponseDto>(`${API_URLS.getAllUsers}/${userId}`);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axiosPrivate.delete(`${API_URLS.getAllUsers}/${userId}`);
      toast.success("User deleted successfully!");
      navigate("/admin/users");
    } catch (err) {
      toast.error("Failed to delete the user.");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setConfirmationText("");
  };

  const handleUpdate = async (data: UpdateUserFormValues) => {
    try {
      setIsUpdating(true);
      await axiosPrivate.put(`${API_URLS.getAllUsers}/${userId}`, data);
      toast.success("User updated successfully!");
      navigate("/admin/users");
    } catch (err) {
      toast.error("Failed to update the user.");
    } finally {
      setIsUpdating(false);
      setIsModalOpen(false);
    }
  };

  return {
    userResponse,
    error,
    isLoading,
    isModalOpen,
    confirmationText,
    isDeleting,
    setConfirmationText,
    toggleModal,
    handleDelete,
    handleUpdate,
    isUpdating,
  };
};

export default useUserDetails;
