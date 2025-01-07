import ConfirmDeleteRoleModal from "../../components/admin/roles/ConfirmDeleteRoleModal";
import RolesComp from "../../components/admin/roles/RolesComp";
import Spinner from "../../components/common/Spinner";
import Error from "../../components/Error";
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
    isUpdating,
    isModalOpen,
    setConfirmationText,
    toggleModal,
  } = useRoleDetails();

  const pageTitle = isLoading
    ? "Loading Role..."
    : roleResponse
    ? `Role - ${roleResponse?.role?._id}`
    : "Role Not Found";

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

  if (!roleResponse) {
    return (
      <MainLayout title={pageTitle}>
        <div className="text-center mt-8">
          <Error error={"Role not found"} />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={pageTitle}>
      <div className="max-w-4xl mx-auto">
        <RolesComp
          roleResponseDto={roleResponse as RoleResponseDto}
          onSubmit={handleUpdate}
          isUpdating={isUpdating}
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
