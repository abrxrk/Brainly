import Joi from "joi";
import { contentTypes } from "../models/content.schema";

const objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);
export const createContentSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    link: Joi.string(),
    media: Joi.string(),
    mediaId: Joi.string(),

    tags: Joi.array().items(Joi.string()).min(1).required(),
    type: Joi.string()
      .valid(...contentTypes)
      .required(),
  })
    .with("media", "mediaId")
    .with("mediaId", "media")
    .when(Joi.object({ type: "article" }).unknown(), {
      then: Joi.object({
        link: Joi.string().required(),
      }),
    })
    .when(
      Joi.object({ type: Joi.valid("image", "video", "audio") }).unknown(),
      {
        then: Joi.object({
          media: Joi.string().required(),
        }),
      },
    )
    .required(),
};

export const updateContentSchema = {
  params: Joi.object({
    id: objectId.required(),
  }).required(),
  body: Joi.object({
    link: Joi.string(),
    title: Joi.string(),
    media: Joi.string(),
    mediaId: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    type: Joi.string().valid(...contentTypes),
  })
    .or("link", "title", "tags", "type", "media")
    .with("media", "mediaId")
    .with("mediaId", "media")
    .required(),
};

export const shareContentSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }).required(),
};

export const deleteContentSchema = {
  params: Joi.object({
    id: objectId.required(),
  }).required(),
};
