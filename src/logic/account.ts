import { Connection, getConnection, Repository } from "typeorm";
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
    const result = await this._repositoryUser.save(user);
    return result;
  }

  async getAll() {
    return await this._repositoryUser.find({
      select: ["id", "username", "mail"],
    });
  }

  async getById(userId: number) {
    return await this._repositoryUser.findOne({
      select: ["id", "username", "mail"],
      where: {
        id: userId,
      },
    });
  }

  async getByUsername(user: string) {
    return await this._repositoryUser.findOne({
      select: ["id", "username", "mail"],
      where: {
        username: user,
      },
    });
  }

  async login(user: string, pwd: string) {
    const userHandle = await this._repositoryUser.findOne({
      select: ["id", "username", "mail", "password"],
      where: {
        username: user,
      },
    });
    if (!userHandle) return false;
    return compareSync(pwd, userHandle.password);
  }
}
