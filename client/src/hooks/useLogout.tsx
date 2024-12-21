import { logout } from "../api/serverApi";
import { ErrorEnum } from "../constants/errorConstants";
import { useAuth } from "../context/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLogout = () => {
  const { setAuth, setPersist } = useAuth();

  const navigate: NavigateFunction = useNavigate();

  const logoutHandler = async (): Promise<void> => {
    setAuth(null);
    try {
      await logout();
      toast.success("User logged out successfully !");
      navigate("/");
      setPersist(false);
    } catch (error: any) {
      if (error?.message === ErrorEnum.NETWORK_ERROR) {
        toast.error(error.message);
      }
    }
  };
  return logoutHandler;
};

export default useLogout;
