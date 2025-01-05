import { Params, useParams } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import ResetPasswordForm from "../../components/auth/resetPassword/ResetPasswordForm";

const ResetPassword = () => {
  const { token } = useParams<Readonly<Params<string>>>();

  return (
    <AuthLayout title="Reset Password">
      <ResetPasswordForm token={token as string} />
    </AuthLayout>
  );
};

export default ResetPassword;
