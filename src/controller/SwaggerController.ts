import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger-output.json";

export default (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
