import "reflect-metadata";
import { createConnection, Repository } from "typeorm";
import config from "./db/ormconfig";

(async () => {
  try {
    const connection = await createConnection(config);

    console.log(
      `Successfully connected to database ${process.env.MYSQL_USER}@${process.env.MYSQL_HOST}`
    );
  } catch (error) {
    console.log("Error while connecting to the database", error);
    return error;
  }
})();
