import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import PageNotFound from "./pages/notFound/NotFound";
import PersistLogin from "./components/auth/persistLogin/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/home/Home";
import { UserRoles } from "./types/roles.types";
import Room from "./pages/room/Room";
import RoomNotFound from "./components/RoomNotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllRoomsPage from "./pages/admin/AllRoomsPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import RoomDetailsPage from "./pages/admin/RoomDetailsPage";
import UsersPage from "./pages/admin/UsersPage";
import UserDetailsPage from "./pages/admin/UserDetailsPage";
import RolesPage from "./pages/admin/RolesPage";
import Profile from "./pages/profile/Profile";
import RoleDetailsPage from "./pages/admin/RoleDetailsPage";
import AddRolePage from "./pages/admin/AddRolePage";

const AppRoutes = (): JSX.Element => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:token",
      element: <ResetPassword />,
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />,
    },
    {
      element: <PersistLogin />,
      children: [
        {
          element: (
            <RequireAuth allowedRoles={[UserRoles.ADMIN, UserRoles.USER]} />
          ),
          children: [
            {
              path: "/home",
              element: <Room />,
            },
            {
              path: "/editor/:roomId",
              element: <Home />,
            },
            {
              path: "/room-not-found",
              element: <RoomNotFound />,
            },
            {
              path: "/profile/:userId",
              element: <Profile />,
            },
          ],
        },
        {
          element: <RequireAuth allowedRoles={[UserRoles.ADMIN]} />,
          children: [
            {
              path: "/admin",
              element: <AdminDashboard />,
            },
            {
              path: "/admin/rooms",
              element: <AllRoomsPage />,
            },
            {
              path: "/admin/rooms/:roomId",
              element: <RoomDetailsPage />,
            },
            {
              path: "/admin/users",
              element: <UsersPage />,
            },
            {
              path: "/admin/users/:userId",
              element: <UserDetailsPage />,
            },
            {
              path: "/admin/roles",
              element: <RolesPage />,
            },
            {
              path: "/admin/roles/:roleId",
              element: <RoleDetailsPage />,
            },
            {
              path: "/admin/roles/new",
              element: <AddRolePage />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
