import { HttpCode } from "../consts/code";
import { BaseRequest, PagingRequest } from "../interfaces/request";
import { IToken, TokenModel } from "../models/token";
import { buildResponse } from "../utils/http";

export default class TokenService {
	public async getTokensInfo(request: PagingRequest) {
		try {
			const offset = Number(request.query.offset);
			const limit = Number(request.query.limit);

			let tokens: IToken[] = await TokenModel.find({}).lean().skip(offset).limit(limit).sort({ tokenName: -1 });
			return buildResponse(tokens, HttpCode.HTTP_STATUS_ACCEPTED, "");
		} catch (err) {
			return buildResponse(null, HttpCode.HTTP_INTERNAL_SERVER_ERROR, err.message);
		}
	}

	public async getTokenDetails(request: BaseRequest) {
		try {
			const tokenCode = request.params.code;
			let token: IToken = await TokenModel.findOne({ code: tokenCode });
			if (!token) {
				return buildResponse(null, HttpCode.HTTP_NOT_FOUND, "Token not found");
			}
			return buildResponse(token, HttpCode.HTTP_STATUS_ACCEPTED, "");
		} catch (err) {
			return buildResponse(null, HttpCode.HTTP_INTERNAL_SERVER_ERROR, err.message);
		}
	}
}