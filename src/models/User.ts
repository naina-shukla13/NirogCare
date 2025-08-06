import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  uid: string;
  email?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  uid: { type: String, required: true, unique: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite issue in Next.js dev mode
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
