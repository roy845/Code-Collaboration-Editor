import AdminTiles from "../../components/admin/AdminTiles";
import MainLayout from "../../components/layouts/MainLayout";

const AdminDashboard = () => {
  return (
    <MainLayout title="Admin">
      <AdminTiles />
    </MainLayout>
  );
};

export default AdminDashboard;
