import { Server } from "hapi";
import TokenController from "../controllers/token-controller";
import * as reqValidator from "../validators/request";

export default function addTokenRoutes(server: Server) {
	const tokenController = new TokenController();
	server.bind(tokenController);

	server.route({
		method: "GET",
		path: "/tokens",
		handler: tokenController.getTokensInfo,
		options: {
			description: "Get paging coins list",
			auth: false,
			validate: {
				query: reqValidator.pagingParams
			}
		}
	});

	server.route({
		method: "GET",
		path: "/tokens/{code}",
		handler: tokenController.getTokenDetails,
		options: {
			description: "Get paging coins list",
			auth: false
		}
	});
}