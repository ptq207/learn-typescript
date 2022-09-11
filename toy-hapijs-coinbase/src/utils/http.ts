import { ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { IResponse } from "../interfaces/response";

export function buildResponse(data: any, code: number, message: string): IResponse {
	return {
		data: data,
		code: code,
		message: message
	}
}

export function buildResponseHapi(respContent: IResponse, h: ResponseToolkit): ResponseObject {
	const resp = h.response(respContent)
	resp.code(respContent.code)
	resp.message(respContent.message)
	resp.header("Accept", "application/json")
	return resp
}