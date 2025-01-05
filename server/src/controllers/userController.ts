import { Request, Response } from "express";
import { HttpStatus } from "../constants/httpStatus";
import { ValidateObjectIdRequest } from "../middlewares/validateObjectId.middleware";
import UserService from "../services/userService";
import {
  AssignRolesRequest,
  GetAllUsersRequest,
  RemoveRolesRequest,
  UpdateUserRequest,
} from "../types/userTypes";
import Utils from "../utils/utils";

class UserController {
  static async getAllUsers(req: GetAllUsersRequest, res: Response) {
    try {
      const { search = "", page = 1, limit = 10 } = req.query;
      const { users, totalUsers } = await UserService.getAllUsers(
        search as string,
        Number(page),
        Number(limit)
      );
      res.status(HttpStatus.OK).json({
        users,
        totalUsers,
        currentPage: Number(page),
        totalPages: Math.ceil(totalUsers / Number(limit)),
      });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch users." });
    }
  }

  static async getUserById(req: ValidateObjectIdRequest, res: Response) {
    try {
      const { objectId } = req.params;
      const { user, status, message } = await UserService.getUserById(
        objectId!
      );
      res.status(status).json({ message, user });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users." });
    }
  }

  static async deleteAllUsers(req: Request, res: Response) {
    try {
      await UserService.deleteAllUsers();
      res
        .status(HttpStatus.OK)
        .json({ message: "All users have been deleted." });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete users." });
    }
  }

  static async deleteUser(req: ValidateObjectIdRequest, res: Response) {
    const { objectId } = req.params;
    try {
      const { message, status } = await UserService.deleteUser(objectId!);

      res.status(status).json({ message });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete the user." });
    }
  }

  static async updateUserById(req: UpdateUserRequest, res: Response) {
    const { objectId } = req.params;
    const { email, password, roles, username, avatar } = req.body;

    let hashedPassword: string | undefined = undefined;

    if (password) {
      hashedPassword = await Utils.hashPassword(password);
    }

    try {
      const result = await UserService.updateUserById(objectId!, {
        email,
        avatar,
        password: hashedPassword,
        roles,
        username,
      });

      if (result.status === HttpStatus.NOT_FOUND) {
        res.status(result.status).json({ message: result.message });
        return;
      }

      res
        .status(HttpStatus.OK)
        .json({ message: result.message, user: result.user });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: "Failed to update user",
      });
    }
  }

  static async assignRoles(req: AssignRolesRequest, res: Response) {
    const { objectId } = req.params;
    const { roles } = req.body;

    try {
      const result = await UserService.assignRoles(objectId!, roles!);
      res
        .status(result.status)
        .json({ message: result.message, user: result.user });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: "Failed to assign roles.",
      });
    }
  }

  static async removeRoles(req: RemoveRolesRequest, res: Response) {
    const { objectId } = req.params;
    const { roles } = req.body;

    try {
      const result = await UserService.removeRoles(objectId!, roles!);
      res
        .status(result.status)
        .json({ message: result.message, user: result.user });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: "Failed to remove roles.",
      });
    }
  }

  static async removeAllRoles(req: ValidateObjectIdRequest, res: Response) {
    const { objectId } = req.params;

    try {
      const result = await UserService.removeAllRoles(objectId!);
      res
        .status(result.status)
        .json({ message: result.message, user: result.user });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: "Failed to remove all roles.",
      });
    }
  }
}

export default UserController;
