import { HttpStatus } from "../constants/httpStatus";
import RoleDal from "../dal/RoleDal";
import { IRole } from "../models/role.model";

class RoleService {
  static async createRole(name: string) {
    const existingRole = await RoleDal.findRoleByName(name as string);

    if (existingRole) {
      return {
        message: "Role already exists.",
        status: HttpStatus.CONFLICT,
      };
    }

    const role = await RoleDal.createRole(name);

    return {
      message: "Role created successfully.",
      role,
      status: HttpStatus.CREATED,
    };
  }
  static async getAllRolesPaginated(
    search: string = "",
    page: number,
    limit: number
  ) {
    const skip: number = (page - 1) * limit;

    const { roles, totalRoles } = await RoleDal.getAllRolesPaginated(
      search,
      skip,
      limit
    );

    return { roles, totalRoles };
  }

  static async getAllRoles() {
    const roles = await RoleDal.getAllRoles();

    return roles;
  }

  static async getRoleById(roleId: string) {
    const role = await RoleDal.findRoleById(roleId);
    let status = 0;
    let message = "";

    if (!role) {
      message = "Role not found.";
      status = HttpStatus.NOT_FOUND;
      return { status, message };
    }

    status = HttpStatus.OK;
    return { role, status };
  }

  static async deleteAllRoles() {
    await RoleDal.deleteAllRoles();
  }

  static async deleteRole(roleId: string) {
    const role = await RoleDal.deleteRoleById(roleId);

    let message: string = "";
    let status: number = 0;

    if (!role) {
      message = "Role not found.";
      status = HttpStatus.NOT_FOUND;
      return { message, status };
    }

    message = `Role ${role?.name} has been deleted.`;
    status = HttpStatus.OK;
    return { message, status };
  }

  static async updateRoleById(roleId: string, updateData: Partial<IRole>) {
    const role = await RoleDal.updateRoleById(roleId, updateData);

    let message: string = "";
    let status: number = 0;

    if (!role) {
      message = "Role not found.";
      status = HttpStatus.NOT_FOUND;
      return { message, status };
    }

    message = `Role ${role?.name} has been updated successfully.`;
    status = HttpStatus.OK;
    return { role, message, status };
  }
}

export default RoleService;
