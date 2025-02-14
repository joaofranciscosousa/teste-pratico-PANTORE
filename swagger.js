const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "REST API",
    description: "API teste",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Ambiente de desenvolvimento",
    },
  ],
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

const outputFile = "./swagger-output.json";
const routes = [
  "./src/controller/UserController.ts",
  "./src/controller/PermissionController.ts",
];

swaggerAutogen(outputFile, routes, doc);
