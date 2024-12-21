import { Navigate, Outlet } from "react-router-dom";
import { AllowedRoles } from "../types/roles.types";
import useRequireAuth from "../hooks/useRequireAuth";

type RequireAuthProps = {
  allowedRoles: AllowedRoles[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { roles, auth, pathname } = useRequireAuth();

  return roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: pathname }} replace />
  ) : (
    <Navigate to="/" state={{ from: pathname }} replace />
  );
};

export default RequireAuth;
