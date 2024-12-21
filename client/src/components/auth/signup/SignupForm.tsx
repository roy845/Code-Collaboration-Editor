import { FaUserLock } from "react-icons/fa";
import Label from "../../common/Label";
import Input from "../../common/Input";
import FormError from "../../common/FormError";
import PasswordVisibility from "./PasswordVisibility";
import Button from "../../common/Button";
import AccountOptions from "./AccountOptions";
import useSignupForm from "../../../hooks/useSignupForm";

const SignupForm = (): JSX.Element => {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    passwordVisible,
    isSubmitting,
    togglePasswordVisibility,
  } = useSignupForm();

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
          <Label label="Username" />
          <Input
            register={register}
            fieldName="username"
            placeholder="Enter username"
            type="text"
          />
          {errors.username && <FormError message={errors.username.message} />}
        </div>
        <div className="mb-4">
          <Label label="Email" />
          <Input
            register={register}
            fieldName="email"
            placeholder="Enter email"
            type="text"
          />
          {errors.email && <FormError message={errors.email.message} />}
        </div>
        <div className="mb-4">
          <Label label="Password" />
          <div className="relative">
            <Input
              register={register}
              fieldName="password"
              placeholder="Enter password"
              type={passwordVisible ? "text" : "password"}
            />
            <PasswordVisibility
              passwordVisible={passwordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>
          {errors.password && <FormError message={errors.password.message} />}
        </div>
        <div className="mb-4">
          <Label label="Confirm Password" />
          <div className="relative">
            <Input
              register={register}
              fieldName="confirmPassword"
              placeholder="Confirm password"
              type={passwordVisible ? "text" : "password"}
            />
            <PasswordVisibility
              passwordVisible={passwordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>

          {errors.confirmPassword && (
            <FormError message={errors.confirmPassword?.message} />
          )}
        </div>
        <div className="flex justify-center mb-4">
          <Button type="submit" text="Sign Up" disabled={isSubmitting} />
        </div>
        <AccountOptions isLogin={false} />
      </form>
    </div>
  );
};

export default SignupForm;
