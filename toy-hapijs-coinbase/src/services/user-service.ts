import { IUser, UserModel } from "../models/user";
import { BaseRequest, ILoginRequest, IRegisterRequest, IUpdateProfileRequest } from "../interfaces/request";
import * as Bcrypt from "bcrypt";
import { generateToken, parseToken } from "../utils/auth";
import { HttpCode } from "../consts/code";
import { buildResponse } from "../utils/http";
import { v4 as uuid } from "uuid";

export default class UserService {
	public async login(request: ILoginRequest) {
		try {
			const { username, password } = request.payload;
			let user: IUser = await UserModel.findOne({ username: username }).lean();

			if (!user) {
				console.log(`user ${username} does not exist`);
				return buildResponse(null, HttpCode.HTTP_BAD_REQUEST, "User does not exist");
			}

			let hashedPassword = user.password;
			if (!Bcrypt.compareSync(password, hashedPassword)) {
				return buildResponse(null, HttpCode.HTTP_BAD_REQUEST, "Password not match");
			}

			const token = generateToken(user);
			if (!token) {
				return buildResponse(null, HttpCode.HTTP_INTERNAL_SERVER_ERROR, "Login fail. Please try again");
			}

			return buildResponse({ token }, HttpCode.HTTP_STATUS_OK, "Login successfully");

		} catch (err) {
			return buildResponse(null, HttpCode.HTTP_INTERNAL_SERVER_ERROR, err.message);
		}
	}

	public async getUserByUserID(request: BaseRequest) {
		try {
			const userID = request.params.id;
			const user: IUser = await UserModel.findOne({ userID: userID }).lean();
			if (!user) {
				return buildResponse(null, HttpCode.HTTP_NOT_FOUND, "User does not exist");
			}
			return buildResponse(user, HttpCode.HTTP_STATUS_ACCEPTED, "");

		} catch (err) {
			return buildResponse(null, HttpCode.HTTP_INTERNAL_SERVER_ERROR, err.message);
		}
	}

	public async getUserProfile(request: BaseRequest) {
		try {
			// const token = request.headers["authorization"];
			// const jwtToken = token.replace("Bearer ", "");
			// const payload = parseToken(jwtToken);
			// console.log("PAYLOAD: ", payload)
			
			// if (!payload || !payload.id) {
			// 	console.log(`invalid token: ${token}`);
			// 	return buildResponse(null, HttpCode.HTTP_BAD_REQUEST, "Invalid token");
			// }
			const reqOpts = request.opts;
			const user: IUser = await UserModel.findOne({ userID: reqOpts["id"] }).lean();
			return buildResponse(user, HttpCode.HTTP_STATUS_ACCEPTED, "");

		} catch (err) {
			return buildResponse(null, HttpCode.HTTP_INTERNAL_SERVER_ERROR, err.message);
		}
	}

	public async createUser(request: IRegisterRequest) {
		try {
			const userID: string = uuid();
			const { username, password, email } = request.payload;

			const checkUser: IUser = await UserModel.findOne({ username: username, email: email });

			if (checkUser) {
				console.log(`username ${username} or email ${email} already exists`);
				return buildResponse(null, HttpCode.HTTP_BAD_REQUEST, "User already exists");
			}

			const hashedPassword = Bcrypt.hashSync(password, Bcrypt.genSaltSync(2));

			const user: IUser = await UserModel.create({
				userID: userID,
				username: username,
				email: email,
				password: hashedPassword
			});

			const token = generateToken(user);
			return buildResponse({ token }, HttpCode.HTTP_STATUS_CREATED, "Register successfully");

		} catch (err) {
			return buildResponse(null, HttpCode.HTTP_INTERNAL_SERVER_ERROR, err.message);
		}
	}

	public async updateUser(request: IUpdateProfileRequest) {
		try {
			// const token = request.headers["authorization"];
			// const jwtToken = token.replace("Bearer ", "");
			// const payload = parseToken(jwtToken);
			// if (!payload || !payload.id) {
			// 	console.log(`invalid token: ${token}`);
			// 	return buildResponse(null, HttpCode.HTTP_BAD_REQUEST, "Invalid token");
			// }
			const reqOtps = request.opts;
			let filter = { userID: reqOtps["id"] };
			let updatePayload: object = {};

			const { username, email, avatar } = request.payload;
			if (username !== undefined) {
				updatePayload["username"] = username;
			}
			if (email !== undefined) {
				updatePayload["email"] = email;
			}
			if (avatar !== undefined) {
				updatePayload["avatar"] = avatar;
			}

			let user: IUser = await UserModel.findOneAndUpdate(filter, updatePayload).lean();
			console.log(filter);
			console.log("UPDATED USER ", user)
			if (!user) {
				console.log(`User with userID=${reqOtps["id"]} does not exist`);
				return buildResponse(null, HttpCode.HTTP_BAD_REQUEST, "User does not exists");
			}

			return buildResponse(updatePayload, HttpCode.HTTP_STATUS_ACCEPTED, "Update profile successfully");

		} catch (err) {
			return buildResponse(null, HttpCode.HTTP_INTERNAL_SERVER_ERROR, err.message);
		}
	}
}