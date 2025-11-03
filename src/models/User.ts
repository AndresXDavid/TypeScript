import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
     name: string;
     email: string;
     passwordHash: string;
     comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     passwordHash: { type: String, required: true }
}, { timestamps: true });

UserSchema.methods.comparePassword = async function (password: string) {
     return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model<IUser>("User", UserSchema);