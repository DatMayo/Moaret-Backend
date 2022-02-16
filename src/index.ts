import "reflect-metadata";
import { createConnection, Repository } from "typeorm";
import config from "./db/ormconfig";
import express from "express";

import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { IResponse } from "./interfaces";
import { Account } from "./logic";
import { AccountList } from "./routes/user";

let sqlConnection: NodeJS.Timer;

async function connectTooDb() {
  try {
    await createConnection(config);

    console.log(
      `Successfully connected to database ${process.env.MYSQL_USER}@${process.env.MYSQL_HOST}`
    );

    const accHandle = new Account();
    const user = await accHandle.getByUsername("admin");
    if (!user) {
      const adminCreateResult = await accHandle.create(
        "admin",
        "admin",
        "changeme@somewhere.com"
      );
      const message = adminCreateResult
        ? "Successfully created admin account"
        : "Could not create admin account";
      console.log(message);
    }

    startServer();
  } catch (error) {
    setTimeout(connectTooDb, 1000);
    console.log("Error while connecting to the database");
  }
}

function startServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  if (process.env.NODE_ENV === "production") {
    app.use(morgan("combined"));
    app.use(helmet());
  } else {
    app.use(morgan("dev"));
  }

  app.get("/favicon.ico", (req, res) => res.status(204));

  app.use("/account", [AccountList]);

  app.all("*", (req, res) => {
    const errorResponse: IResponse = {
      code: 404,
      error: [
        {
          msg: "The given site does not exist",
        },
      ],
    };
    res.status(errorResponse.code).send(errorResponse);
  });

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
}

sqlConnection = setTimeout(connectTooDb, 1000);
