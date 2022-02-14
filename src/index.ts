import "reflect-metadata";
import { createConnection, Repository } from "typeorm";
import config from "./db/ormconfig";

let sqlConnection: NodeJS.Timer;

async function connectTooDb() {
  try {
    await createConnection(config);

    console.log(
        `Successfully connected to database ${process.env.MYSQL_USER}@${process.env.MYSQL_HOST}`
    );
  } catch (error) {
    setTimeout(connectTooDb, 1000)
    console.log("Error while connecting to the database", error);
    return error;
  }
}

sqlConnection = setTimeout(connectTooDb, 1000)