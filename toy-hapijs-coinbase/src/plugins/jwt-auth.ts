import { ResponseToolkit, Server } from "hapi";
import * as ConfigManager from "../configs/configs";
import { BaseRequest } from "../interfaces/request";
import { UserModel } from "../models/user";
import { IPlugin } from "./interfaces";

const validate = async (decoded: any, r: BaseRequest, h: ResponseToolkit) => {
	try {
		if (!decoded.id) {
			return { isValid: false }
		}
		const user = await UserModel.findOne({ userID: decoded.id }).lean();
		if (!user) {
			return { isValid: false }
		}

		if (r.opts === undefined) {
			r.opts = { id: decoded.id }
		} else {
			r.opts["id"] = decoded.id;
		}
		
		return { isValid: true }
	} catch (err) {
		console.error("Error to validate token ", err)
		throw err
	}
}

const register = async (server: Server) => {
	await server.register(require("hapi-auth-jwt2"));
	const jwtConfig = ConfigManager.getJwtConfig();
	server.auth.strategy("jwt", "jwt", {
		key: jwtConfig.jwtSecretKey,
		validate,
		verifyOptions: {
			algorithms: [jwtConfig.algorithm]
		}
	});
	server.auth.default("jwt");
}

export default (): IPlugin => {
	return {
		info: {
			name: "jwt-auth",
			description: "Authenticate using jwt",
			version: "0.0.1"
		},
		register
	}
}