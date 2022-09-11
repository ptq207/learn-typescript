import { Request } from "hapi";
import {} from "@hapi/hapi";

export interface BaseRequest extends Request {
	opts: object
}

export interface PagingRequest extends BaseRequest {
	query: {
		offset: string
		limit: string
	}
}

export interface ILoginRequest extends BaseRequest {
	payload: {
		username: string
		password: string
	}
}

export interface IRegisterRequest extends BaseRequest {
	payload: {
		username: string
		password: string
		email: string
	}
}

export interface IUpdateProfileRequest extends BaseRequest {
	payload: {
		username: string
		email: string
		avatar: string
	}
}