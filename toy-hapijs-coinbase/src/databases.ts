import * as mongoose from "mongoose";
import { IDatabaseConfig } from "./configs/configs";

export function init(configs: Record<string, IDatabaseConfig>) {
	Object.entries(configs).forEach(async ([dbName, config]) => {
		await mongoose.connect(config.connection);

		let mongoConn = mongoose.connection;

		mongoConn.on("error", () => {
			console.error(`Error while connecting to database: ${config.connection}`);
		});

		mongoConn.on("open", () => {
			console.log(`Connect to database ${config.connection} successully`);
		})
	})
}