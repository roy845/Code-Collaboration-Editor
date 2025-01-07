import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import useFetch from "./useFetch";
import { API_URLS } from "../api/api-urls";
import useCustomNavigate from "./useCustomNavigate";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";
import { AxiosInstance } from "axios";
import { PaginatedRolesResponseDto } from "../types/roles.types";

const useRoles = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number | "all">(10);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchRoles, setSearchRoles] = useState<string>("");
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
    debouncedSearchKeyword(searchRoles);
  }, [searchRoles, debouncedSearchKeyword]);

  const {
    data: rolesResponse,
    error,
    isLoading,
    setState,
  } = useFetch<PaginatedRolesResponseDto>(API_URLS.getAllRolesPaginated, {
    search: searchKeyword,
    page: page.toString(),
    limit: limit === "all" ? "" : limit.toString(),
  });

  const handleSearchChange = (value: string) => {
    setSearchRoles(value);
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
      await axiosPrivate.delete(`/roles`);
      toast.success("All roles deleted successfully!");
      setState({ data: null, error: null, isLoading: false });
    } catch (err) {
      toast.error("Failed to delete all roles.");
    } finally {
      setIsDeletingAll(false);
      setIsModalOpen(false);
    }
  };

  // Prepare data for the bar chart
  const chartData = {
    labels: ["Roles Count"],
    datasets: [
      {
        label: "Roles Count",
        data: [rolesResponse?.roles?.length || 0],
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
        text: "Roles Chart",
      },
    },
  };

  return {
    rolesResponse,
    error,
    isLoading,
    searchRoles,
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

export default useRoles;
