import { z } from "zod";

export type AccountType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export interface IAccountRepository {
  create(account: Account): Promise<Account>;
}

export class Account {
  public readonly id: string = "";
  public readonly name: string = "";
  public readonly email: string = "";
  public readonly password: string = "";

  constructor(account: AccountType) {
    const { id, name, email, password } = account;

    const okName = z.string().min(3).max(255).parse(name);
    const okEmail = z.string().email().parse(email);
    const okPassword = z.string().min(6).max(255).parse(password);

    this.id = id;
    this.name = okName;
    this.email = okEmail;
    this.password = okPassword;
  }
}
