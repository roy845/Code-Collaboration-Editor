import MainLayout from "../../components/layouts/MainLayout";
import useProfile from "../../hooks/useProfile";
import ProfileComp from "../../components/ProfileComp";

const Profile = () => {
  const {
    data: userResponse,
    error,
    handleUpdate,
    isLoading,
    isUpdating,
  } = useProfile();

  return (
    <MainLayout title="Profile">
      <div className="max-w-4xl mx-auto">
        <ProfileComp
          error={error}
          isUpdating={isUpdating}
          isLoading={isLoading}
          onSubmit={handleUpdate}
          userResponse={userResponse}
        />
      </div>
    </MainLayout>
  );
};

export default Profile;
