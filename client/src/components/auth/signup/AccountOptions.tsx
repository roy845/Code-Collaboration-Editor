import { Link } from "react-router-dom";

type AccountOptionsProps = {
  isLogin?: boolean;
  isForgotPassword?: boolean;
};

const AccountOptions = ({
  isLogin,
  isForgotPassword,
}: AccountOptionsProps): JSX.Element => {
  return (
    <div className="flex justify-between">
      <div className={`flex gap-4 ${!isLogin && "justify-center w-full"}`}>
        <p className={`${!isLogin && "flex items-center"}`}>
          {isForgotPassword
            ? "Remember your password ?"
            : isLogin
            ? "New member"
            : "Have an account ?"}
        </p>
        <Link to={isLogin ? "/signup" : "/"} className="text-purple-700">
          {isLogin ? "Signup" : "Login"}
        </Link>
      </div>

      {isLogin && <Link to="/forgot-password">Forgot your password ? </Link>}
    </div>
  );
};

export default AccountOptions;
