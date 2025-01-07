import MainLayout from "../../components/layouts/MainLayout";
import Spinner from "../../components/common/Spinner";
import Error from "../../components/Error";
import RoomComp from "../../components/admin/rooms/RoomComp";
import ConfirmDeleteRoomModal from "../../components/admin/rooms/ConfirmDeleteRoomModal";
import useRoomDetails from "../../hooks/useRoomDetails";

const RoomDetailsPage = () => {
  const {
    roomResponse,
    error,
    isLoading,
    isModalOpen,
    confirmationText,
    isDeleting,
    setConfirmationText,
    toggleModal,
    handleDelete,
  } = useRoomDetails();

  const pageTitle = isLoading
    ? "Loading Room..."
    : roomResponse
    ? `Room - ${roomResponse?.room?._id}`
    : "Room Not Found";

  if (isLoading) {
    return (
      <MainLayout title={pageTitle}>
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title={pageTitle}>
        <div className="text-center mt-8">
          <Error
            error={
              error?.response?.data?.error
                ? error?.response?.data?.error
                : error?.response?.data?.message
            }
          />
        </div>
      </MainLayout>
    );
  }

  if (!roomResponse) {
    return (
      <MainLayout title={pageTitle}>
        <div className="text-center mt-8">
          <Error error={"Room not found"} />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={pageTitle}>
      <RoomComp room={roomResponse?.room} onDelete={toggleModal} />
      {isModalOpen && (
        <ConfirmDeleteRoomModal
          confirmationText={confirmationText}
          setConfirmationText={setConfirmationText}
          isDeleting={isDeleting}
          onCancel={toggleModal}
          onDelete={handleDelete}
        />
      )}
    </MainLayout>
  );
};

export default RoomDetailsPage;
