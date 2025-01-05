import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../constants/httpStatus";
import { ValidateObjectIdRequest } from "../middlewares/validateObjectId.middleware";
import {
  CreateRoleRequestBody,
  GetAllRolesRequest,
  UpdateRoleRequest,
} from "../types/roleTypes";
import RoleService from "../services/roleService";

class RoleController {
  static async createRole(
    req: Request<{}, {}, CreateRoleRequestBody>,
    res: Response,
    next: NextFunction
  ) {
    const { name } = req.body;

    try {
      const { message, role, status } = await RoleService.createRole(name);
      res.status(status).json({ message, role });
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to create role." });
    }
  }

  static async getAllRolesPaginated(req: GetAllRolesRequest, res: Response) {
    try {
      const { search = "", page = 1, limit = 10 } = req.query;
      const { roles, totalRoles } = await RoleService.getAllRolesPaginated(
        search as string,
        Number(page),
        Number(limit)
      );
      res.status(HttpStatus.OK).json({
        roles,
        totalRoles,
        currentPage: Number(page),
        totalPages: Math.ceil(totalRoles / Number(limit)),
      });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch roles." });
    }
  }

  static async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await RoleService.getAllRoles();
      res.status(HttpStatus.OK).json({
        roles,
      });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch roles." });
    }
  }

  static async getRoleById(req: ValidateObjectIdRequest, res: Response) {
    try {
      const { objectId } = req.params;
      const { role, status, message } = await RoleService.getRoleById(
        objectId!
      );
      res.status(status).json({ message, role });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch role." });
    }
  }

  static async deleteAllRoles(req: Request, res: Response) {
    try {
      await RoleService.deleteAllRoles();
      res
        .status(HttpStatus.OK)
        .json({ message: "All roles have been deleted." });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete roles." });
    }
  }

  static async deleteRole(req: ValidateObjectIdRequest, res: Response) {
    const { objectId } = req.params;
    try {
      const { message, status } = await RoleService.deleteRole(objectId!);

      res.status(status).json({ message });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete the role." });
    }
  }

  static async updateRoleById(req: UpdateRoleRequest, res: Response) {
    const { objectId } = req.params;
    const { name } = req.body;

    try {
      const result = await RoleService.updateRoleById(objectId!, {
        name,
      });

      if (result.status === HttpStatus.NOT_FOUND) {
        res.status(result.status).json({ message: result.message });
        return;
      }

      res
        .status(HttpStatus.OK)
        .json({ message: result.message, role: result.role });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: "Failed to update role",
      });
    }
  }
}

export default RoleController;
