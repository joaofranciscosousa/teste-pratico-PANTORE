import { NextFunction, Response, Request } from "express";
import returnServerError from "./returnServerError";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  returnServerError({
    res,
    error,
    status: error.status,
    extraData: error.extraData,
  });
};

export default errorHandler;
