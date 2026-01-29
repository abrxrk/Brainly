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
      if (schema.params || schema.query) {
        const combined = {
          ...req.params,
          ...req.query,
        };

        const validator = schema.params || schema.query;

        const { error, value } = validator!.validate(combined, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) throw error;

        req.params = value;
        req.query = value;
      }

      next();
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.details?.map((d: any) => d.message),
      });
    }
  };
