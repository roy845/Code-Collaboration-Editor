// import { User } from "./userTypes.types";

import { AllowedRoles } from "./roles.types";

export type Auth = {
  // user: User;
  accessToken: string;
  refreshToken?: string;
  message: string;
};

export interface ResetPasswordDTO {
  token: string;
  expires: Date;
}

export type UserResponse = {
  _id: string;
  username: string;
  email: string;
  roles: AllowedRoles[];
  resetPassword: ResetPasswordDTO;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserResponseDTO {
  user: UserResponse;
  message: string;
}

export type RefreshTokenResponse = {
  accessToken: string;
  message: string;
};

export interface DecodedToken {
  id: string;
  exp: number;
  username: string;
  email: string;
  roles: AllowedRoles[];
}
