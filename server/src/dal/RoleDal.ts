import Role, { IRole } from "../models/role.model";

class RoleDal {
  static findRoleById(roleId: string) {
    return Role.findOne({ _id: roleId });
  }

  static findRoleByName(name: string) {
    return Role.findOne({ name });
  }

  static getAllRoles() {
    return Role.find();
  }

  static async getAllRolesPaginated(
    search: string,
    skip: number,
    limit: number
  ) {
    const query = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }],
        }
      : {};

    const roles = await Role.find(query).skip(skip).limit(limit);

    const totalRoles: number = await Role.countDocuments(query);

    return { roles, totalRoles };
  }

  static async deleteAllRoles() {
    return Role.deleteMany();
  }

  static async deleteRoleById(roleId: string) {
    return Role.findByIdAndDelete(roleId);
  }

  static async updateRoleById(userId: string, updateData: Partial<IRole>) {
    return Role.findByIdAndUpdate(userId, updateData, { new: true });
  }

  static async createRole(name: string) {
    const newRole = new Role({ name });
    return newRole.save();
  }
}

export default RoleDal;
