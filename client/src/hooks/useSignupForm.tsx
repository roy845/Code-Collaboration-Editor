import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signUp } from "../api/serverApi";
import useCustomNavigate from "./useCustomNavigate";
import { SignupData } from "../types/authTypes";
import { NavigateOptions } from "react-router-dom";
import { SignupSchema } from "../schemas/signupSchema.schema";
import { ErrorEnum } from "../constants/errorConstants";
import { toast } from "react-toastify";

const useSignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
  });

  const customNavigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setPasswordVisible((prev: boolean) => !prev);
  };

  const onSubmit = async (data: SignupData): Promise<void> => {
    try {
      const { confirmPassword, ...finalFormData } = data;
      const { data: Response } = await signUp(finalFormData);
      console.log(Response);
      customNavigate("/", { replace: true });
      toast.success(Response.message);
    } catch (error: any) {
      console.log(error);
      if (error?.message === ErrorEnum.NETWORK_ERROR) {
        toast.error(error?.message);
      } else {
        toast.error(error?.response?.data?.errors[0].message);
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

export default useSignupForm;
