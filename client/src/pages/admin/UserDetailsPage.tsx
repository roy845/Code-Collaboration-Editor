import UserComp from "../../components/admin/users/UserComp";
import MainLayout from "../../components/layouts/MainLayout";
import useUserDetails from "../../hooks/useUserDetails";
import { UserResponseDto } from "../../types/users.types";

const UserDetailsPage = () => {
  const { userResponse, error, isLoading, handleUpdate } = useUserDetails();

  return (
    <MainLayout title={`User - ${userResponse?.user?.username}`}>
      <div className="max-w-4xl mx-auto">
        <UserComp
          userResponse={userResponse as UserResponseDto}
          error={error}
          isLoading={isLoading}
          onSubmit={handleUpdate}
        />
      </div>
    </MainLayout>
  );
};

export default UserDetailsPage;
