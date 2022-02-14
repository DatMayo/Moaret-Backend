import { IAccountData } from "./";

export interface IAccountDataExtended extends IAccountData {
  iat: number;
  eat: number;
}
