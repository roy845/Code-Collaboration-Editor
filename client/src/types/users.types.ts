import { UserRoles } from "./roles.types";

export type UserDto = {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  roles: UserRoles[];
  createdAt: string;
  updatedAt: string;
};

export type UserResponseDto = {
  user: UserDto;
};

export type UsersResponseDto = {
  users: UserDto[];
  currentPage: number;
  totalPages: number;
  totalRooms: number;
};
