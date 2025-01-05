import MainLayout from "../../components/layouts/MainLayout";
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
import useRoles from "../../hooks/useRoles";
import { PaginatedRolesResponseDto } from "../../types/roles.types";
import RolesTableView from "../../components/admin/roles/RolesTableView";
import ConfirmDeleteAllRolesModal from "../../components/admin/roles/ConfirmDeleteAllRolesModal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RolesPage = () => {
  const {
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
  } = useRoles();

  return (
    <MainLayout title="Roles">
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
            <RolesTableView
              rolesResponse={rolesResponse as PaginatedRolesResponseDto}
              isLoading={isLoading}
              error={error}
              searchRoles={searchRoles}
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
          <ConfirmDeleteAllRolesModal
            confirmationText={confirmationText}
            setConfirmationText={setConfirmationText}
            isDeleting={isDeletingAll}
            onCancel={toggleModal}
            onDelete={handleDeleteAll}
            confirmationMessage={`"Delete All Roles"`}
            expectedText="Delete All Roles"
          />
        )}
      </div>
    </MainLayout>
  );
};

export default RolesPage;
