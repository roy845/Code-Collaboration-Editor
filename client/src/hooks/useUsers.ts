import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import useFetch from "./useFetch";
import { API_URLS } from "../api/api-urls";
import useCustomNavigate from "./useCustomNavigate";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";
import { AxiosInstance } from "axios";
import { UsersResponseDto } from "../types/users.types";

const useUsers = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number | "all">(10);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchUsers, setSearchUsers] = useState<string>("");
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
    debouncedSearchKeyword(searchUsers);
  }, [searchUsers, debouncedSearchKeyword]);

  const {
    data: usersResponse,
    error,
    isLoading,
    setState,
  } = useFetch<UsersResponseDto>(API_URLS.getAllUsers, {
    search: searchKeyword,
    page: page.toString(),
    limit: limit === "all" ? "" : limit.toString(),
  });

  const handleSearchChange = (value: string) => {
    setSearchUsers(value);
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
      await axiosPrivate.delete(`/users`);
      toast.success("All users deleted successfully!");
      setState({ data: null, error: null, isLoading: false });
    } catch (err) {
      toast.error("Failed to delete all users.");
    } finally {
      setIsDeletingAll(false);
      setIsModalOpen(false);
    }
  };

  // Prepare data for the bar chart
  const chartData = {
    labels: ["Users Count"],
    datasets: [
      {
        label: "Users Count",
        data: [usersResponse?.users?.length || 0],
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
    usersResponse,
    error,
    isLoading,
    searchUsers,
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

export default useUsers;
