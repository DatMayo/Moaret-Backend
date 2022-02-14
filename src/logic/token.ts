import {
  JsonWebTokenError,
  JwtPayload,
  NotBeforeError,
  sign,
  TokenExpiredError,
  verify,
} from "jsonwebtoken";
import { IAccountData, IAccountDataExtended } from "../interfaces";

export class Token {
  private readonly _accessTokenSecret: string;
  private readonly _refreshTokenSecret: string;
  lastError = "";

  constructor() {
    this._accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
    this._refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "";
  }

  create(data: IAccountData): string {
    return sign(data, this._accessTokenSecret, {
      expiresIn: "1d",
    });
  }

  verify(token: string): IAccountDataExtended | null {
    try {
      const decoded = verify(token, this._accessTokenSecret);
      return decoded as IAccountDataExtended;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        this.lastError = err.name;
      } else if (err instanceof JsonWebTokenError) {
        this.lastError = err.name;
      } else if (err instanceof NotBeforeError) {
        this.lastError = err.name;
      }
      return null;
    }
  }
}
