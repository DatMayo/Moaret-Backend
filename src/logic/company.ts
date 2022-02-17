import {
  Connection,
  createQueryBuilder,
  getConnection,
  getRepository,
  Repository,
} from "typeorm";
import { DBCompany } from "../db/entities";
import { Account } from "./";

export class Company {
  private _connection: Connection;
  private _repositoryCompany: Repository<DBCompany>;

  constructor() {
    this._connection = getConnection();
    this._repositoryCompany = this._connection.getRepository(DBCompany);
  }

  async create(name: string, ownerId: number): Promise<boolean> {
    const accountHandle = new Account();
    const userAccount = await accountHandle.getById(ownerId);
    if (!userAccount) return false;

    const compHandle = new DBCompany();
    compHandle.name = name;
    compHandle.owner = userAccount;
    const result = await this._repositoryCompany.save(compHandle);
    return !!result;
  }

  async getAll(): Promise<DBCompany[]> {
    return getRepository(DBCompany)
      .createQueryBuilder("comp")
      .leftJoinAndSelect("comp.owner", "compOwner")
      .getMany();
  }

  getById(companyId: number): Promise<DBCompany | undefined> {
    return getRepository(DBCompany)
      .createQueryBuilder("comp")
      .where("comp.id = :compId", { compId: companyId })
      .getOne();
  }

  getByName(companyName: string): Promise<DBCompany[]> {
    return getRepository(DBCompany)
      .createQueryBuilder("comp")
      .where("comp.name = :compName", { compName: companyName })
      .getMany();
  }
}
