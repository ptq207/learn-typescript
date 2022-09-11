import { Server } from "hapi";
import UserController from "../controllers/user-controller";
import * as userValidator from "../validators/user";
import * as reqValidator from "../validators/request";

export default function addUserRoutes(
	server: Server
) {
	const userController = new UserController();
	server.bind(userController);

	server.route({
		method: "GET",
		path: "/users/{id}",
		handler: userController.getUserByID,
		options: {
			description: "Get user info",
			validate: {
				headers: reqValidator.jwtToken,
				options: {
					allowUnknown: true
				}
			}
		}
	});

	server.route({
		method: "GET",
		path: "/users/profile",
		handler: userController.getUserProfile,
		options: {
			description: "Get user profile",
			validate: {
				headers: reqValidator.jwtToken,
				options: {
					allowUnknown: true
				}
			}
		}
	});

	server.route({
		method: "POST",
		path: "/auth/login",
		handler: userController.login,
		options: {
			auth: false,
			description: "Login",
			validate: {
				payload: userValidator.loginPayload
			}
		}
	});

	server.route({
		method: "POST",
		path: "/users",
		handler: userController.createUser,
		options: {
			auth: false,
			description: "Create new user",
			validate: {
				payload: userValidator.registerPayload
			}
		}
	});

	server.route({
		method: "PUT",
		path: "/users",
		handler: userController.updateUser,
		options: {
			description: "Update user info",
			validate: {
				payload: userValidator.updateUserPayload
			}
		}
	});
}