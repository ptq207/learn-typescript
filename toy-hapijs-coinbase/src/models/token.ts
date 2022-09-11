import { Schema, model } from "mongoose";

export interface IToken {
	code: string
	tokenName: string
	price: number
	marketCap: number
	vol: number
	issueDate: Date
	introduction?: string
}

export const TokenSchema = new Schema(
	{
		code: { type: String, required: true, unique: true },
		tokenName: { type: String, required: true, unique: true },
		price: { type: Number, required: true },
		marketCap: { type: Number, required: true },
		vol: { type: Number, required: true },
		issueDate: { type: Date },
		introduction: { type: String }
	}
);

export const TokenModel = model<IToken>("Token", TokenSchema)
