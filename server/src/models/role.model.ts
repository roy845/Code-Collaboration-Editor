import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "./user.model";

export interface IRole extends Document {
  name: UserRole;
}

const RoleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model<IRole>("Role", RoleSchema);
