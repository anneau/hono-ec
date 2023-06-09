import { z } from "zod";

export interface IAccountRepository {
  find(id: string): Promise<Account>;
  findByEmail(email: string): Promise<Account>;
  create(account: Account): Promise<Account>;
}

class Email {
  public value: string = "";

  static async initialize(repository: IAccountRepository, email: string) {
    const parsed = z.string().email().parse(email);
    const model = new Email();
    const account = await repository.findByEmail(parsed);
    if (account) {
      throw new Error("Email already exists.");
    }
    model.value = parsed;
    return model;
  }
}

class Password {
  public value: string = "";

  static initialize(password: string) {
    const parsed = z.string().min(6).max(255).parse(password);
    const model = new Password();
    model.value = parsed;
    return model;
  }
}

export class Account {
  public id: string = "";
  public name: string = "";
  public email: string = "";
  public password: string = "";

  static async initialize(
    repository: IAccountRepository,
    id: string,
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) {
    const account = new Account();
    const okID = z.string().uuid().parse(id);
    const okName = z.string().min(3).max(255).parse(name);
    const okEmail = await Email.initialize(repository, email);
    const okPassword = Password.initialize(password);

    if (password !== passwordConfirmation) {
      throw new Error("パスワードとパスワード確認が一致しません");
    }

    account.id = okID;
    account.name = okName;
    account.email = okEmail.value;
    account.password = okPassword.value;

    return account;
  }

  static reConstructor(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    const account = new Account();
    account.id = id;
    account.name = name;
    account.email = email;
    account.password = password;

    return account;
  }
}
