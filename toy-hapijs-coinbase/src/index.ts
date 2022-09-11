import * as Server from "./server";
import * as Database from "./databases";
import * as ConfigManager from "./configs/configs";

const start = async function() {
	try {
		const serverConfig = ConfigManager.getServerConfig();
		const server = await Server.init(serverConfig);
		await server.start();
		console.log("Server is running at: ", server.info.uri);
	} catch (err) {
		console.error("Error while starting server: ", err.message)
		throw err
	}
}

const initDB = function() {
	const dbConfig = ConfigManager.getDatabaseConfig();
	Database.init(dbConfig);
}

initDB();
start();