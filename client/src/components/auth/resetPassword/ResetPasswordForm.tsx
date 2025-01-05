import { FaUserLock } from "react-icons/fa";
import Label from "../../common/Label";
import Input from "../../common/Input";
import PasswordVisibility from "../signup/PasswordVisibility";
import FormError from "../../common/FormError";
import Button from "../../common/Button";
import useResetPasswordForm from "../../../hooks/useResetPasswordForm";

type ResetPasswordFormProps = {
  token: string;
};

const ResetPasswordForm = ({ token }: ResetPasswordFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    passwordVisible,
    togglePasswordVisibility,
    onSubmit,
  } = useResetPasswordForm(token);

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full p-8 shadow-md rounded-md border border-white"
      >
        <div className="flex flex-col items-center">
          <FaUserLock size={50} />
        </div>

        <div className="mb-4">
          <Label label="Password" />
          <div className="relative">
            <Input
              register={register}
              fieldName="newPassword"
              placeholder="Enter password"
              type={passwordVisible ? "text" : "password"}
            />
            <PasswordVisibility
              passwordVisible={passwordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>
          {errors.newPassword && (
            <FormError message={errors.newPassword.message} />
          )}
        </div>
        <div className="mb-4">
          <Label label="Confirm Password" />
          <div className="relative">
            <Input
              register={register}
              fieldName="confirmNewPassword"
              placeholder="Confirm password"
              type={passwordVisible ? "text" : "password"}
            />
            <PasswordVisibility
              passwordVisible={passwordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>

          {errors.confirmNewPassword && (
            <FormError message={errors.confirmNewPassword?.message} />
          )}
        </div>
        <div className="flex justify-center mb-4">
          <Button type="submit" text="Reset Password" disabled={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
