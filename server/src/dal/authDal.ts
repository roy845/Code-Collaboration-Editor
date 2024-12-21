import User, { IUser } from "../models/user.model";

class AuthDal {
  static async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  static async findUserByRefreshToken(
    refreshToken: string
  ): Promise<IUser | null> {
    return User.findOne({ refreshToken });
  }

  static async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }

  static async saveUser(user: IUser): Promise<void> {
    user.save();
  }
}

export default AuthDal;
