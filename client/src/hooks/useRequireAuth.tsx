import { useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { DecodedToken } from "../types/authTypes.types";
import { AllowedRoles } from "../types/roles.types";
import decodeToken from "../utils/decodeToken";

const useRequireAuth = () => {
  const { auth } = useAuth();
  const { pathname } = useLocation();

  const decodedToken: DecodedToken | null = auth?.accessToken
    ? decodeToken<DecodedToken>(auth?.accessToken)
    : null;

  const roles: AllowedRoles[] = decodedToken?.roles || [];

  return { roles, auth, pathname };
};

export default useRequireAuth;
