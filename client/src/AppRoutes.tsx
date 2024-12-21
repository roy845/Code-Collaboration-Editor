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
    //  {
    //    path: "/forgot-password",
    //    element: <ForgotPassword />,
    //  },
    //  {
    //    path: "/reset-password/:token",
    //    element: <ResetPassword />,
    //  },
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
            //  {
            //    path: "/task/:taskId",
            //    element: <TaskPage />,
            //  },
            //  {
            //    path: "/taskNotFound/:taskId",
            //    element: <TaskNotFound />,
            //  },
            //  {
            //    path: "/editTask/:taskId",
            //    element: <EditTask />,
            //  },
          ],
        },
        //  {
        //    element: <RequireAuth allowedRoles={[UserRoles.ADMIN]} />,
        //    children: [
        //      {
        //        path: "/users",
        //        element: <UsersPage />,
        //      },
        //      {
        //        path: "/roles",
        //        element: <RolesPage />,
        //      },
        //      {
        //        path: "/roles/assignRoles",
        //        element: <AssignRoles />,
        //      },
        //      {
        //        path: "/roles/removeRoles",
        //        element: <RemoveRoles />,
        //      },
      ],
      //  },
      //    ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
