import ConfirmDeleteUserModal from "../../components/admin/users/ConfirmDeleteUserModal";
import UserComp from "../../components/admin/users/UserComp";
import MainLayout from "../../components/layouts/MainLayout";
import useUserDetails from "../../hooks/useUserDetails";
import { UserResponseDto } from "../../types/users.types";

const UserDetailsPage = () => {
  const {
    userResponse,
    error,
    isLoading,
    handleUpdate,
    handleDelete,
    isDeleting,
    isUpdating,
    confirmationText,
    isModalOpen,
    setConfirmationText,
    toggleModal,
  } = useUserDetails();
  const pageTitle = isLoading
    ? "Loading User..."
    : `User - ${userResponse?.user?.username || "Unknown User"}`;
  return (
    <MainLayout title={pageTitle}>
      <div className="max-w-4xl mx-auto">
        <UserComp
          userResponse={userResponse as UserResponseDto}
          error={error}
          isLoading={isLoading}
          onSubmit={handleUpdate}
          onDelete={toggleModal}
          isUpdating={isUpdating}
        />
      </div>
      {isModalOpen && (
        <ConfirmDeleteUserModal
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

export default UserDetailsPage;
