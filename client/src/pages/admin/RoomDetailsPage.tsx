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

  if (isLoading) {
    return (
      <MainLayout title="Room">
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title="Room Not Found">
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
      <MainLayout title="Room Not Found">
        <div className="text-center mt-8">
          <Error error={"Room not found"} />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Room - ${roomResponse?.room?._id}`}>
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
