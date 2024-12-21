import { refreshToken } from "../api/serverApi";
import { useAuth } from "../context/auth";
import useLogout from "./useLogout";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const logout = useLogout();

  const refresh = async () => {
    try {
      const {
        data: { accessToken },
      } = await refreshToken();
      setAuth((prev) => {
        return { ...prev, accessToken };
      });

      return accessToken;
    } catch (error) {
      console.log(error);
      logout();
    }
  };
  return refresh;
};

export default useRefreshToken;
