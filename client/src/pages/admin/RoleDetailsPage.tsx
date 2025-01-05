import ConfirmDeleteRoleModal from "../../components/admin/roles/ConfirmDeleteRoleModal";
import RolesComp from "../../components/admin/roles/RolesComp";
import MainLayout from "../../components/layouts/MainLayout";
import useRoleDetails from "../../hooks/useRoleDetails";
import { RoleResponseDto } from "../../types/roles.types";

const RoleDetailsPage = () => {
  const {
    roleResponse,
    error,
    isLoading,
    handleUpdate,
    confirmationText,
    handleDelete,
    isDeleting,
    isModalOpen,
    setConfirmationText,
    toggleModal,
  } = useRoleDetails();

  return (
    <MainLayout title={`Role - ${roleResponse?.role?.name}`}>
      <div className="max-w-4xl mx-auto">
        <RolesComp
          roleResponseDto={roleResponse as RoleResponseDto}
          error={error}
          isLoading={isLoading}
          onSubmit={handleUpdate}
          onDelete={toggleModal}
        />
        {isModalOpen && (
          <ConfirmDeleteRoleModal
            confirmationText={confirmationText}
            setConfirmationText={setConfirmationText}
            isDeleting={isDeleting}
            onCancel={toggleModal}
            onDelete={handleDelete}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default RoleDetailsPage;
