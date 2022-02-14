import { ConnectionOptions } from "typeorm";
import { DBUser } from "./entities/User";

const config: ConnectionOptions = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  // entities: [__dirname + "./entities/*.{.ts,.js}"],
  entities: [DBUser],
  cli: {
    migrationsDir: "src/db/migrations",
  },
};

export default config;
