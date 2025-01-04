import { DataSource } from "typeorm";
import { Quote } from "./entity/Quote";
import dotenv from "dotenv";
import {User} from "./entity/User";
dotenv.config();

export const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Quote],
  subscribers: [],
  migrations: [],
});
