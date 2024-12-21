import Label from "../../common/Label";
import Input from "../../common/Input";
import FormError from "../../common/FormError";
import Button from "../../common/Button";
import { FaUserLock } from "react-icons/fa";
import PasswordVisibility from "../signup/PasswordVisibility";
import AccountOptions from "../signup/AccountOptions";
import useLoginForm from "../../../hooks/useLoginForm";

const LoginForm = (): JSX.Element => {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isSubmitting,
    passwordVisible,
    togglePasswordVisibility,
    persist,
    togglePersist,
  } = useLoginForm();

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
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
            className="cursor-pointer mr-2"
          />
          <label htmlFor="persist" className="cursor-pointer">
            Trust This Device
          </label>
        </div>
        <div className="flex justify-center mb-4">
          <Button type="submit" text="Login" disabled={isSubmitting} />
        </div>
        <AccountOptions isLogin />
      </form>
    </div>
  );
};

export default LoginForm;
