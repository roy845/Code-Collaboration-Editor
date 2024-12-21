export type SignupDto = {
  username: string;
  email: string;
  password: string;
};

export type LoginDto = Omit<SignupDto, "username">;

export type ForgotPasswordDto = {
  email: string;
};

export type ResetPasswordDto = {
  newPassword: string;
  token: string;
};
