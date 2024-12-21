import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { login } from "../api/serverApi";
import useCustomNavigate from "./useCustomNavigate";
import LoginSchema from "../schemas/loginSchema.schema";
import { useAuth } from "../context/auth";
import { LoginData } from "../types/authTypes";
import { NavigateOptions } from "react-router-dom";
import { ErrorEnum } from "../constants/errorConstants";
import { useLocation } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import { toast } from "react-toastify";

const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const { setAuth, setPersist, persist } = useAuth();

  const { setValue } = useLocalStorage();

  const location = useLocation();
  const customNavigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setPasswordVisible((prev: boolean) => !prev);
  };

  const from: string = location?.state?.from?.pathname || "/home";

  const onSubmit = async (data: LoginData): Promise<void> => {
    try {
      const { data: authData } = await login(data);
      const { accessToken, message } = authData;

      setAuth({ accessToken });
      customNavigate(from, { replace: true });
      toast.success(message);
    } catch (error: any) {
      if (error?.message === ErrorEnum.NETWORK_ERROR) {
        toast.error(error?.message);
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    setValue("persist", persist);
  }, [persist]);

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    passwordVisible,
    setPasswordVisible,
    togglePasswordVisibility,
    onSubmit,
    persist,
    togglePersist,
  };
};

export default useLoginForm;
