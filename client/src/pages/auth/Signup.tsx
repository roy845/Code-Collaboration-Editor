import SignupForm from "../../components/auth/signup/SignupForm";
import AuthLayout from "../../components/layouts/AuthLayout";

const Signup = () => {
  return (
    <AuthLayout title="Signup">
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
