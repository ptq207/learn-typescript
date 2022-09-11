import { Schema, model } from "mongoose";

export interface IUser {
	userID: string
	username: string
	email: string
	password: string
	createdAt: Date
	updatedAt: Date
	avatar?: string
}

export const UserSchema = new Schema(
	{
		userID: { type: String, unique: true, required: true },
		username: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		avatar: { type: String }
	},
	{
		timestamps: true
	}
);

export const UserModel = model<IUser>("User", UserSchema);