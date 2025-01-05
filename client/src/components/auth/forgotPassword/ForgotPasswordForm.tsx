import { FaUserLock } from "react-icons/fa";
import Label from "../../common/Label";
import Input from "../../common/Input";
import FormError from "../../common/FormError";
import Button from "../../common/Button";
import AccountOptions from "../signup/AccountOptions";
import useForgotPasswordForm from "../../../hooks/useForgotPasswordForm";

const ForgotPasswordForm = (): JSX.Element => {
  const { register, handleSubmit, errors, onSubmit, isSubmitting } =
    useForgotPasswordForm();

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full p-8 shadow-md rounded-md border border-white"
      >
        <div className="flex flex-col items-center">
          <FaUserLock size={50} />
        </div>
        <div className="mb-4 items-start">
          <Label label="Email" />
          <Input
            register={register}
            fieldName="email"
            placeholder="Enter email"
            type="text"
          />
          {errors.email && <FormError message={errors.email.message} />}
        </div>
        <div className="flex justify-center mb-4">
          <Button
            type="submit"
            text="Send Reset Link"
            disabled={isSubmitting}
          />
        </div>
        <AccountOptions isForgotPassword />
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
