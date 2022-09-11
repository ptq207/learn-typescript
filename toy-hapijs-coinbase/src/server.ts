import { Server } from "@hapi/hapi";
import * as Config from "./configs/configs";
import addTokenRoutes from "./routes/token-routes";
import addUserRoutes from "./routes/user-routes";

export async function init(config: Config.IServerConfig): Promise<Server> {
	try {
		const port = process.env.PORT || config.port;
		const server = new Server({
			host: "0.0.0.0",
			port: port,
			routes: {
				cors: {
					origin: ["*"]
				}
			}
		});

		const plugins = Config.getPlugins();
		let promisePlugins: Promise<any>[] = [];

		plugins.forEach(pluginName => {
			const plugin = require("./plugins/" + pluginName).default();
			console.log(`Registering plugin ${pluginName}`);
			promisePlugins.push(plugin.register(server));
		});
		await Promise.all(promisePlugins);
		console.log("Registered all plugins successfully");

		console.log("Adding routes...");
		addUserRoutes(server);
		addTokenRoutes(server);

		return server;
	} catch (err) {
		throw err
	}
}