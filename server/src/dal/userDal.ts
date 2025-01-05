import User, { IUser, UserRole } from "../models/user.model";

class UserDal {
  static async assignRoles(userId: string, roles: UserRole[]) {
    return User.findByIdAndUpdate(
      userId,
      { $addToSet: { roles: { $each: roles } } },
      { new: true }
    ).select("_id username avatar email roles createdAt updatedAt");
  }

  static async removeRoles(userId: string, roles: UserRole[]) {
    return User.findByIdAndUpdate(
      userId,
      { $pull: { roles: { $in: roles } } },
      { new: true }
    ).select("_id username avatar email roles createdAt updatedAt");
  }

  static async removeAllRoles(userId: string) {
    return User.findByIdAndUpdate(userId, { roles: [] }, { new: true }).select(
      "_id username avatar email roles createdAt updatedAt"
    );
  }

  static findUserById(userId: string) {
    return User.findOne({ _id: userId }).select(
      "_id username avatar email roles createdAt updatedAt"
    );
  }

  static async getAllUsers(search: string, skip: number, limit: number) {
    const query = search
      ? {
          $or: [
            { username: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(query)
      .select("_id username avatar email roles createdAt updatedAt")
      .skip(skip)
      .limit(limit);

    const totalUsers: number = await User.countDocuments(query);

    return { users, totalUsers };
  }

  static async deleteAllUsers() {
    return User.deleteMany();
  }

  static async deleteUserById(userId: string) {
    return User.findByIdAndDelete(userId);
  }

  static async updateUserById(userId: string, updateData: Partial<IUser>) {
    return User.findByIdAndUpdate(userId, updateData, { new: true }).select(
      "_id username avatar email roles createdAt updatedAt"
    );
  }
}

export default UserDal;
