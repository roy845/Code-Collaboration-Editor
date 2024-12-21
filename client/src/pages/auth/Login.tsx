import LoginForm from "../../components/auth/login/LoginForm";
import AuthLayout from "../../components/layouts/AuthLayout";

const Login = () => {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
