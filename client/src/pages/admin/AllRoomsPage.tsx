import MainLayout from "../../components/layouts/MainLayout";
import useRooms from "../../hooks/useRooms";
import ConfirmDeleteAllRoomsModal from "../../components/admin/rooms/ConfirmDeleteAllRoomsModal";
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
import RoomTableView from "../../components/admin/rooms/RoomsTableView";
import Tabs from "../../components/admin/rooms/Tabs";
import { RoomsResponseDto } from "../../types/room.types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AllRoomsPage = () => {
  const {
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
  } = useRooms();

  return (
    <MainLayout title="Rooms">
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
            <RoomTableView
              roomsResponse={roomsResponse as RoomsResponseDto}
              isLoading={isLoading}
              error={error}
              searchRooms={searchRooms}
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
          <ConfirmDeleteAllRoomsModal
            confirmationText={confirmationText}
            setConfirmationText={setConfirmationText}
            isDeleting={isDeletingAll}
            onCancel={toggleModal}
            onDelete={handleDeleteAll}
            confirmationMessage={`"Delete All Rooms"`}
            expectedText="Delete All Rooms"
          />
        )}
      </div>
    </MainLayout>
  );
};

export default AllRoomsPage;
