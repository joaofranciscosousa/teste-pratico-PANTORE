import { AppDataSource } from "./data-source";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morganBody from "morgan-body";
import SwaggerController from "./controller/SwaggerController";
import UserController from "./controller/UserController";
import PermissionController from "./controller/PermissionController";
import TypeormValidationError from "./middlewares/TypeormValidationError";
import errorHandler from "./middlewares/errorHandler";
import { getEnv } from "./helper/validation";

const app = express();

morganBody(app, { immediateReqLog: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

SwaggerController(app);
UserController(app);
PermissionController(app);

// Error handler
app.use(TypeormValidationError);
app.use(errorHandler);

AppDataSource.initialize()
  .then(() => console.info("Database Connected"))
  .catch((err) => {
    throw err;
  });

app.listen(getEnv("PORT"), () =>
  console.info(`Listening on port ${getEnv("PORT")}`)
);
