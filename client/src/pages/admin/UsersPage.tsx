import MainLayout from "../../components/layouts/MainLayout";
import useUsers from "../../hooks/useUsers";
import { FaArrowRight } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import Tabs from "../../components/admin/rooms/Tabs";
import ConfirmDeleteAllUsersModal from "../../components/admin/users/ConfirmDeleteAllUsersModal";
import UsersTableView from "../../components/admin/users/UsersTableView";
import { UsersResponseDto } from "../../types/users.types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UsersPage = () => {
  const {
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
    toggleModal,
    confirmationText,
    handleDeleteAll,
    isDeletingAll,
    setConfirmationText,
    isModalOpen,
    activeTab,
    setActiveTab,
    chartData,
    chartOptions,
  } = useUsers();

  return (
    <MainLayout title="Users">
      <div className="p-6 bg-gray-900 text-white">
        <div className="flex justify-end">
          <FaArrowRight
            className="cursor-pointer text-xl text-white mt-2"
            onClick={() => customNavigate("/admin")}
          />
        </div>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex gap-4 items-center mb-4">
          {activeTab === "chart" ? (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-5xl mx-auto">
              <Bar
                data={chartData}
                options={chartOptions}
                className="cursor-pointer"
              />
            </div>
          ) : (
            <UsersTableView
              usersResponse={usersResponse as UsersResponseDto}
              isLoading={isLoading}
              error={error}
              searchUsers={searchUsers}
              limit={limit}
              page={page}
              handleSearchChange={handleSearchChange}
              handleLimitChange={handleLimitChange}
              handlePageChange={handlePageChange}
              customNavigate={customNavigate}
              toggleModal={toggleModal}
            />
          )}
        </div>
        {isModalOpen && (
          <ConfirmDeleteAllUsersModal
            confirmationText={confirmationText}
            setConfirmationText={setConfirmationText}
            isDeleting={isDeletingAll}
            onCancel={toggleModal}
            onDelete={handleDeleteAll}
            confirmationMessage={`"Delete All Users"`}
            expectedText="Delete All Users"
          />
        )}
      </div>
    </MainLayout>
  );
};

export default UsersPage;
