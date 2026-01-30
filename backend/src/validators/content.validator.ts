import Joi from "joi";
import { contentTypes } from "../models/content.schema";

export const createContentSchema = {
  body: Joi.object({
    link: Joi.string().required(),
    title: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    type: Joi.string().required(),
  }).required(),
};

export const updateContentSchema = {
  body: Joi.object({
    link: Joi.string(),
    title: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    type: Joi.string().valid(...contentTypes),
  }).or("link", "title", "tags", "type").required(),
};

export const shareContentSchema = {
  body: Joi.object({
    id: Joi.string().required(),
  }).required()
}
