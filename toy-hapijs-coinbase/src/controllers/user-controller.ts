import { ResponseToolkit, Request } from "@hapi/hapi";
import { BaseRequest, ILoginRequest, IRegisterRequest, IUpdateProfileRequest } from "../interfaces/request";
import UserService from "../services/user-service";
import { buildResponseHapi } from "../utils/http";

export default class UserController {
	private userService: UserService = new UserService()

	public async login(r: ILoginRequest, h: ResponseToolkit) {
		const respContent = await this.userService.login(r);
		return buildResponseHapi(respContent, h);
	}

	public async getUserByID(r: BaseRequest, h: ResponseToolkit) {
		const respContent = await this.userService.getUserByUserID(r);
		return buildResponseHapi(respContent, h);
	}

	public async getUserProfile(r: BaseRequest, h: ResponseToolkit) {
		const respContent = await this.userService.getUserProfile(r);
		return buildResponseHapi(respContent, h);
	}

	public async createUser(r: IRegisterRequest, h: ResponseToolkit) {
		const respContent = await this.userService.createUser(r);
		return buildResponseHapi(respContent, h);
	}

	public async updateUser(r: IUpdateProfileRequest, h: ResponseToolkit) {
		const respContent = await this.userService.updateUser(r);
		return buildResponseHapi(respContent, h);
	}
}