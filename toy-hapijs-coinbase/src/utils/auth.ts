import { IUser } from "../models/user";
import * as Jwt from "jsonwebtoken";
import * as ConfigManager from "../configs/configs";
import { Buffer } from "buffer";

export function generateToken(user: IUser) {
	const jwtConfig = ConfigManager.getJwtConfig();
	const payload = { id: user.userID }
	const opts: Jwt.SignOptions = {
		expiresIn: jwtConfig.jwtExpireTime,
		algorithm: jwtConfig.algorithm
	}
	return Jwt.sign(payload, jwtConfig.jwtSecretKey, opts)
}

export function parseToken(token: string) {
	if (!token) {
		return null
	}

	// let base64Str = token.split(".")[1]
	// let payload = Buffer.from(base64Str, "base64");
	// const decodedPayload = JSON.parse(payload.toString())
	const jwtConfig = ConfigManager.getJwtConfig();
	let decoded = Jwt.decode(token);
	console.log(decoded.toString())
	const decodedPayload = JSON.parse(decoded.toString());
	return decodedPayload;
}