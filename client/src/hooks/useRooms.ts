import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import useFetch from "./useFetch";
import { RoomsResponseDto } from "../types/room.types";
import { API_URLS } from "../api/api-urls";
import useCustomNavigate from "./useCustomNavigate";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";
import { AxiosInstance } from "axios";

const useRooms = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number | "all">(10);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchRooms, setSearchRooms] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [activeTab, setActiveTab] = useState<"table" | "chart">("table");

  const customNavigate = useCustomNavigate();
  const axiosPrivate: AxiosInstance = useAxiosPrivate();

  const debouncedSearchKeyword = useCallback(
    debounce((keyword: string) => {
      setSearchKeyword(keyword);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearchKeyword(searchRooms);
  }, [searchRooms, debouncedSearchKeyword]);

  const {
    data: roomsResponse,
    error,
    isLoading,
    setState,
  } = useFetch<RoomsResponseDto>(API_URLS.getAllRooms, {
    search: searchKeyword,
    page: page.toString(),
    limit: limit === "all" ? "" : limit.toString(),
  });

  const handleSearchChange = (value: string) => {
    setSearchRooms(value);
    setPage(1);
  };

  const handleLimitChange = (selectedLimit: number | "all") => {
    setLimit(selectedLimit);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setConfirmationText("");
  };

  const handleDeleteAll = async () => {
    setIsDeletingAll(true);
    try {
      await axiosPrivate.delete(`/rooms`);
      toast.success("All rooms deleted successfully!");
      setState({ data: null, error: null, isLoading: false });
    } catch (err) {
      toast.error("Failed to delete all rooms.");
    } finally {
      setIsDeletingAll(false);
      setIsModalOpen(false);
    }
  };

  // Prepare data for the bar chart
  const chartData = {
    labels: ["Rooms Count"],
    datasets: [
      {
        label: "Rooms Count",
        data: [roomsResponse?.rooms?.length || 0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Rooms Chart",
      },
    },
  };

  return {
    roomsResponse,
    error,
    isLoading,
    searchRooms,
    limit,
    page,
    handleSearchChange,
    handleLimitChange,
    handlePageChange,
    customNavigate,
    confirmationText,
    setConfirmationText,
    isDeletingAll,
    toggleModal,
    handleDeleteAll,
    isModalOpen,
    activeTab,
    setActiveTab,
    chartData,
    chartOptions,
  };
};

export default useRooms;
