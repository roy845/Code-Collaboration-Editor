import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "./useAxiosPrivate";
import { API_URLS } from "../api/api-urls";
import useFetch from "./useFetch";
import { RoleResponseDto } from "../types/roles.types";
import { UpdateRoleData } from "../schemas/updateRole.schema";

const useRoleDetails = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: roleResponse,
    error,
    isLoading,
  } = useFetch<RoleResponseDto>(`${API_URLS.getAllRolesPaginated}/${roleId}`);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axiosPrivate.delete(`${API_URLS.getAllRolesPaginated}/${roleId}`);
      toast.success("Role deleted successfully!");
      navigate("/admin/roles");
    } catch (err) {
      toast.error("Failed to delete the role.");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setConfirmationText("");
  };

  const handleUpdate = async (data: UpdateRoleData) => {
    try {
      await axiosPrivate.put(
        `${API_URLS.getAllRolesPaginated}/${roleId}`,
        data
      );
      toast.success("Role updated successfully!");
      navigate("/admin/roles");
    } catch (err) {
      toast.error("Failed to update the role.");
    }
  };

  return {
    roleResponse,
    error,
    isLoading,
    isModalOpen,
    confirmationText,
    isDeleting,
    setConfirmationText,
    toggleModal,
    handleDelete,
    handleUpdate,
  };
};

export default useRoleDetails;
