import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "./useAxiosPrivate";
import { RoomResponseDto } from "../types/room.types";
import { API_URLS } from "../api/api-urls";
import useFetch from "./useFetch";

const useRoomDetails = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: roomResponse,
    error,
    isLoading,
  } = useFetch<RoomResponseDto>(`${API_URLS.getAllRooms}/${roomId}`);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axiosPrivate.delete(`${API_URLS.getAllRooms}/${roomId}`);
      toast.success("Room deleted successfully!");
      navigate("/admin/rooms");
    } catch (err) {
      toast.error("Failed to delete the room.");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setConfirmationText("");
  };

  return {
    roomResponse,
    error,
    isLoading,
    isModalOpen,
    confirmationText,
    isDeleting,
    setConfirmationText,
    toggleModal,
    handleDelete,
  };
};

export default useRoomDetails;
