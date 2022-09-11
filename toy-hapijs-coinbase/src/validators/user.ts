import * as Joi from "joi";

export const loginPayload = Joi.object({
	username: Joi.string().min(6).max(20).required(),
	password: Joi.string().trim().min(6).pattern(new RegExp("^[a-zA-Z@#$%^&*()!0-9]"))
});

export const registerPayload = Joi.object({
	username: Joi.string().min(6).max(20),
	password: Joi.string().trim().min(6).pattern(new RegExp("^[a-zA-Z@#$%^&*()!0-9]")),
	email: Joi.string().trim().email()
});

export const updateUserPayload = Joi.object({
	username: Joi.string().min(6).max(20),
	avatar: Joi.string(),
	email: Joi.string().trim().email()
});