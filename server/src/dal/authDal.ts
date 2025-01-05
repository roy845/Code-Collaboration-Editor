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

  static async findUserByResetPasswordToken(resetPasswordToken: string) {
    return User.findOne({ "resetPassword.token": resetPasswordToken });
  }

  static async findUserByResetPasswordTokenAndExpiresDate(
    resetPasswordToken: string,
    now: Date
  ) {
    return User.findOne({
      "resetPassword.token": resetPasswordToken,
      "resetPassword.expires": { $gt: now },
    });
  }
}

export default AuthDal;
