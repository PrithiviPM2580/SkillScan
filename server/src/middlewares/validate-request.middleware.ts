import { validate, type Schemas } from "zod-express-validator";

type SchemaConfig = Schemas<any, any, any, any>;

export const validateRequest = (schemas: SchemaConfig) => {
  return validate(schemas, ({ bodyError, paramsError, queryError }, res) => {
    const error = bodyError ?? paramsError ?? queryError;

    return res.status(400).json({
      success: false,
      message: "Validation Error",
      error: error?.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
        code: issue.code,
        input: issue.input,
      })),
    });
  });
};
