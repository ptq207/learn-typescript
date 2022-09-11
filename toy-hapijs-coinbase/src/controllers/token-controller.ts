import { ResponseToolkit } from "hapi";
import { BaseRequest, PagingRequest } from "../interfaces/request";
import TokenService from "../services/token-service";
import { buildResponseHapi } from "../utils/http";

export default class TokenController {
	private tokenService = new TokenService();

	public async getTokensInfo(r: PagingRequest, h: ResponseToolkit) {
		const respContent = await this.tokenService.getTokensInfo(r);
		return buildResponseHapi(respContent, h);
	}

	public async getTokenDetails(r: BaseRequest, h: ResponseToolkit) {
		const respContent = await this.tokenService.getTokenDetails(r);
		return buildResponseHapi(respContent, h);
	}
}