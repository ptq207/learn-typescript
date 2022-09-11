import * as path from "path";
import * as nconf from "nconf";

export interface IJwtConfig {
	expireTime: number | string
	secretKey: string
	algorithm: string
}

export interface IServerConfig {
	port: number
}

export interface IDatabaseConfig {
	type: string
	host: string
	port: number
	username: string
	password: string
	database: string
	entities: string[]
}

export interface IMongoConfig {
	connection: string
}

const filePath = path.join(__dirname, `config.${process.env.NODE_ENV}.json`);
const configs = new nconf.Provider({
	env: true,
	argv: true,
	store: {
		type: "file",
		file: filePath
	}
});

export function getDatabaseConfig(dbName: string): IDatabaseConfig {
	const dbConfig = configs.get("database");
	if (dbConfig[dbName] === undefined) {
		return null;
	}
	return dbConfig[dbName];
}

export function getJwtConfig(): IJwtConfig {
	return configs.get("jwt");
}