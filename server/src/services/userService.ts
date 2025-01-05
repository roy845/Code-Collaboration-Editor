import { HttpStatus } from "../constants/httpStatus";
import UserDal from "../dal/userDal";
import { IUser, UserRole } from "../models/user.model";

class UserService {
  static async getAllUsers(search: string = "", page: number, limit: number) {
    const skip: number = (page - 1) * limit;

    const { users, totalUsers } = await UserDal.getAllUsers(
      search,
      skip,
      limit
    );

    return { users, totalUsers };
  }

  static async getUserById(userId: string) {
    const user = await UserDal.findUserById(userId);
    let status = 0;
    let message = "";

    if (!user) {
      message = "User not found.";
      status = HttpStatus.NOT_FOUND;
      return { status, message };
    }

    status = HttpStatus.OK;
    return { user, status };
  }

  static async deleteAllUsers() {
    await UserDal.deleteAllUsers();
  }

  static async deleteUser(roomId: string) {
    const user = await UserDal.deleteUserById(roomId);

    let message: string = "";
    let status: number = 0;

    if (!user) {
      message = "User not found.";
      status = HttpStatus.NOT_FOUND;
      return { message, status };
    }

    message = `User ${user?.username} has been deleted.`;
    status = HttpStatus.OK;
    return { message, status };
  }

  static async updateUserById(userId: string, updateData: Partial<IUser>) {
    const user = await UserDal.updateUserById(userId, updateData);

    let message: string = "";
    let status: number = 0;

    if (!user) {
      message = "User not found.";
      status = HttpStatus.NOT_FOUND;
      return { message, status };
    }

    message = `User ${user?.username} has been updated successfully.`;
    status = HttpStatus.OK;
    return { user, message, status };
  }

  static async assignRoles(userId: string, roles: UserRole[]) {
    const user = await UserDal.assignRoles(userId, roles);

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: "User not found.",
      };
    }

    return {
      status: HttpStatus.OK,
      message: `Roles have been assigned to user ${user.username}.`,
      user,
    };
  }

  static async removeRoles(userId: string, roles: UserRole[]) {
    const user = await UserDal.removeRoles(userId, roles);

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: "User not found.",
      };
    }

    return {
      status: HttpStatus.OK,
      message: `Roles have been removed from user ${user.username}.`,
      user,
    };
  }

  static async removeAllRoles(userId: string) {
    const user = await UserDal.removeAllRoles(userId);

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: "User not found.",
      };
    }

    return {
      status: HttpStatus.OK,
      message: `All roles have been removed from user ${user.username}.`,
      user,
    };
  }
}

export default UserService;
