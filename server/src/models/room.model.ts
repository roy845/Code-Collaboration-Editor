import mongoose, { Schema, Document } from "mongoose";

interface IRoom extends Document {
  name: string;
  language: string;
  code: string;
}

const RoomSchema = new Schema<IRoom>({
  name: { type: String, unique: true, required: true },
  language: { type: String, default: "javascript" },
  code: { type: String, default: "" },
});

export default mongoose.model<IRoom>("Room", RoomSchema);
