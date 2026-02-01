import { Request, Response, NextFunction } from "express";
import Joi from "joi";

type ValidationSchema = {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
};

export const validateRequest =
  (schema: ValidationSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Handle multer file upload - add file info to body for validation
      if (req.file) {
        req.body.media = req.file.filename; // or req.file.path
        req.body.mediaId = req.file.filename;
      }

      // Parse JSON strings in body (from FormData)
      if (req.body) {
        Object.keys(req.body).forEach((key) => {
          if (typeof req.body[key] === "string") {
            try {
              // Try to parse if it looks like JSON
              if (
                req.body[key].startsWith("[") ||
                req.body[key].startsWith("{")
              ) {
                req.body[key] = JSON.parse(req.body[key]);
              }
            } catch (e) {
              // If parsing fails, keep as string
            }
          }
        });
      }

      // Validate body
      if (schema.body) {
        const { error, value } = schema.body.validate(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) throw error;

        req.body = value;
      }

      // Validate params or query (frontend-agnostic)
      if (schema.params) {
        const { error, value } = schema.params.validate(req.params, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) throw error;

        req.params = value;
      }

      if (schema.query) {
        const { error, value } = schema.query.validate(req.query, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) throw error;

        // Can't assign to req.query directly, it's read-only
        Object.assign(req.query, value);
      }

      next();
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message || "Validation failed",
      });
    }
  };
