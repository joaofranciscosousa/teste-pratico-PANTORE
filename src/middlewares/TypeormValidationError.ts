import { NextFunction, Response, Request } from "express";
import { isArray, ValidationError } from "class-validator";

const TypeormValidationError = (
  error: ValidationError[],
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isArray(error) && error.some((err) => err instanceof ValidationError)) {
    const formattedErrors = error
      .map((err) =>
        Object.values(err.constraints).map((message) => ({
          attribute: err.property,
          message: message,
        }))
      )
      .flat();

    res.status(422).send(formattedErrors);
  } else {
    next(error);
  }
};

export default TypeormValidationError;
