export type SignupDto = {
  username: string;
  email: string;
  password: string;
};

export type LoginDto = Omit<SignupDto, "username">;

export type ForgotPasswordDto = {
  email: string;
};

export type ForgotPasswordResponseDto = {
  message: string;
};

export type ResetPasswordResponseDto = ForgotPasswordResponseDto;

export type ResetPasswordDto = {
  newPassword: string;
  confirmNewPassword: string;
  token: string;
};
