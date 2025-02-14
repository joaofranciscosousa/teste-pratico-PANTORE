import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import TypeormValidationError from "../../middlewares/TypeormValidationError";
import errorHandler from "../../middlewares/errorHandler";

/**
 * Create application server to test
 * @param controllers Controllers to be added in application
 */
export default (controllers: Function[]): Application => {
  const app: Application = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  controllers.forEach((controller) => controller(app));

  app.use(TypeormValidationError);
  app.use(errorHandler);

  return app;
};
