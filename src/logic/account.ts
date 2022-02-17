import { Connection, getConnection, getRepository, Repository } from "typeorm";
import { DBUser } from "../db/entities";
import { compareSync, hashSync } from "bcryptjs";

export class Account {
  private _connection: Connection;
  private _repositoryUser: Repository<DBUser>;

  constructor() {
    this._connection = getConnection();
    this._repositoryUser = this._connection.getRepository(DBUser);
  }

  async create(username: string, password: string, mail: string) {
    const user: DBUser = new DBUser();
    user.username = username;
    user.password = hashSync(password);
    user.mail = mail;
    user.firstName = undefined;
    user.lastName = undefined;
    const result = await this._repositoryUser.save(user);
    return result;
  }

  async getAll(): Promise<DBUser[]> {
    return await getRepository(DBUser)
      .createQueryBuilder("usr")
      .leftJoinAndSelect("usr.companies", "usrCompanies")
      .getMany();
  }

  async getById(userId: number): Promise<DBUser | undefined> {
    return getRepository(DBUser)
      .createQueryBuilder("usr")
      .leftJoinAndSelect("usr.companies", "usrCompanies")
      .where("usr.id = :usrId", { usrId: userId })
      .getOne();
  }

  async getByUsername(user: string): Promise<DBUser[]> {
    return getRepository(DBUser)
      .createQueryBuilder("usr")
      .leftJoinAndSelect("usr.companies", "usrCompanies")
      .where("usr.username = :usrName", { usrName: user })
      .getMany();
  }

  async login(user: string, pwd: string) {
    const userHandle = await this.getByUsername(user);
    console.log(userHandle);
    if (!userHandle) return false;
    if (userHandle.length === 0) return false;
    if (userHandle.length > 1) return false;
    return compareSync(pwd, userHandle[0].password);
  }
}
