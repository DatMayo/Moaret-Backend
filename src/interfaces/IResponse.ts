import { IError } from "./";

export interface IResponse {
  code: number;
  error?: IError[];
  [propName: string]: unknown;
}
