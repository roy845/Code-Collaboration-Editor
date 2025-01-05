import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import useCustomNavigate from "./useCustomNavigate";
import { ResetPasswordData } from "../types/authTypes";
import { resetPassword } from "../api/serverApi";
import { NavigateOptions } from "react-router-dom";
import { ErrorEnum } from "../constants/errorConstants";
import { toast } from "react-toastify";
import ResetPasswordSchema from "../schemas/resetPasswordSchema.schema";

const useResetPasswordForm = (token: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const customNavigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setPasswordVisible((prev: boolean) => !prev);
  };

  const onSubmit = async (data: ResetPasswordData): Promise<void> => {
    try {
      const { data: resetPasswordData } = await resetPassword({
        ...data,
        token,
      });
      const { message } = resetPasswordData;
      customNavigate("/", { replace: true });
      toast.success(message);
    } catch (error: any) {
      if (error?.message === ErrorEnum.NETWORK_ERROR) {
        toast.error(error?.message);
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    passwordVisible,
    setPasswordVisible,
    togglePasswordVisibility,
    onSubmit,
  };
};

export default useResetPasswordForm;
