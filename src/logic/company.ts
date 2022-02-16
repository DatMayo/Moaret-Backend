import { Connection, getConnection } from "typeorm";

export class Company {
  private _connection: Connection;

  constructor() {
    this._connection = getConnection();
    // ToDo
  }

  create(name: string) {
    // ToDo
  }

  getById(companyId: number) {
    // ToDo
  }

  getByName(companyName: string) {
    // ToDo
  }
}
