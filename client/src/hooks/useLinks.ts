import { useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { DecodedToken } from "../types/authTypes.types";
import decodeToken from "../utils/decodeToken";

const useLinks = () => {
  const location = useLocation();
  const { auth } = useAuth();

  const decodedToken: DecodedToken | null = decodeToken<DecodedToken>(
    auth?.accessToken
  );

  return { location, decodedToken };
};

export default useLinks;
