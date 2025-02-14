import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entites/User";
import { Permission } from "./entites/Permission";
import { getEnv } from "./helper/validation";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: getEnv("MYSQL_HOST"),
  port: Number(getEnv("MYSQL_PORT")),
  username: getEnv("MYSQL_USER"),
  password: getEnv("MYSQL_PASSWORD"),
  database: getEnv("MYSQL_DATABASE"),

  synchronize: false,
  logging: false,
  entities: [User, Permission],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  subscribers: [],
  connectorPackage: "mysql2",
});
