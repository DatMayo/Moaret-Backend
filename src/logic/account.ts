export class Account {
  readonly _username: string;

  constructor(username: string) {
    this._username = username;
  }

  login(password: string) {
    // ToDo: Login magic
  }

  register(password: string) {
    // ToDo: Register magic
  }
}
