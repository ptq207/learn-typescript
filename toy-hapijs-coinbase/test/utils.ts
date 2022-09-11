import * as fs from "fs";
import { UserModel } from "../src/models/user";
import { TokenModel } from "../src/models/token";
import { Server } from "hapi";
import * as Bcrypt from "bcrypt";

export async function seedUserData() {
	let users = JSON.parse(fs.readFileSync(__dirname + "/users/data.json", "utf-8"));
	users.forEach(element => {
		element.password = Bcrypt.hashSync(element.password, Bcrypt.genSaltSync(2));
	});
	await UserModel.create(users);
}

export async function seedTokenData() {
	const tokens = JSON.parse(fs.readFileSync(__dirname + "/tokens/data.json", "utf-8"));
	await TokenModel.create(tokens);
}

export async function login(server: Server, username: string, password: string) {
	return await server.inject({
		method: "POST",
		url: "/auth/login",
		payload: { username, password }
	});
}