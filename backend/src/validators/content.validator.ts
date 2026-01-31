import Joi from "joi";
import { contentTypes } from "../models/content.schema";

export const createContentSchema = {
  body: Joi.object({
    link: Joi.string().required(),
    title: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    type: Joi.string().valid(...contentTypes),
  }).required(),
};

export const updateContentSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }).required(),
  body: Joi.object({
    link: Joi.string(),
    title: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    type: Joi.string().valid(...contentTypes),
  })
    .or("link", "title", "tags", "type")
    .required(),
};

export const shareContentSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }).required(),
};

export const deleteContentSchema = {
  params: Joi.object({
    id: Joi.string().required()
  }).required()
}