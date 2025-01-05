import mongoose, { Schema, Document, Model } from "mongoose";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  roles: UserRole[];
  avatar: string;
  resetPassword: {
    token: string;
    expires: Date;
  };
  refreshToken: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    roles: {
      type: [String],
      enum: Object.values(UserRole),
      default: [UserRole.USER],
    },
    resetPassword: {
      token: {
        type: String,
        required: false,
      },
      expires: {
        type: Date,
        required: false,
      },
    },
    refreshToken: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
      trim: true,
      default:
        "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
