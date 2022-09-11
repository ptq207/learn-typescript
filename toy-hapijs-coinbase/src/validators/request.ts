import * as Joi from "joi";

export const pagingParams = Joi.object({
	offset: Joi.number().integer().min(0).default(0),
	limit: Joi.number().integer().min(1).max(50).default(5)
});

export const jwtToken = Joi.object({
	"authorization": Joi.string().required()
}).unknown();