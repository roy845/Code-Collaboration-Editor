import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordData } from "../types/authTypes";
import { forgotPassword } from "../api/serverApi";
import { ErrorEnum } from "../constants/errorConstants";
import ForgotPasswordSchema from "../schemas/forgotPasswordSchema.schema";
import { toast } from "react-toastify";

const useForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData): Promise<void> => {
    try {
      const { data: forgotPasswordData } = await forgotPassword(data);
      const { message } = forgotPasswordData;
      toast.success(message);

      reset();
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
    onSubmit,
    isSubmitting,
  };
};

export default useForgotPasswordForm;
