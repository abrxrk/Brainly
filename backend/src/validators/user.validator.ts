import Joi from "joi";

export const createUserSchema = {
  body: Joi.object({
    username: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(8).required(),
  }).required(),
};

export const loginUserSchema = {
  body: Joi.object({
    username: Joi.string().min(3).max(25).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(8).required(),
  }).or("username", "email").required(),
};
