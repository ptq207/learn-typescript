import { Algorithm } from "jsonwebtoken";
import * as nconf from "nconf";
import * as path from "path";

export interface IJwtConfig {
	jwtExpireTime: number | string
	jwtSecretKey: string,
	algorithm: Algorithm
}

export interface IServerConfig {
	port: number
}

export interface IDatabaseConfig {
	connection: string
}

const filePath = path.join(__dirname, `configs.${process.env.NODE_ENV}.json`);
console.log("Read config at", filePath);

const configs = new nconf.Provider({
	env: true,
	argv: true,
	store: {
		type: "file",
		file: filePath
	}
});

export function getDatabaseConfig(): Record<string, IDatabaseConfig> {
	return configs.get("database");
}

export function getServerConfig(): IServerConfig {
	return configs.get("server");
}

export function getJwtConfig(): IJwtConfig {
	return configs.get("jwt");
}

export function getPlugins(): string[] {
	return configs.get("plugins");
}