import { Email } from "./account/email";
import { ID } from "./account/id";
import { Name } from "./account/name";
import { Password } from "./account/password";

export interface IAccountRepository {
  find(id: string): Promise<Account>;
  findByEmail(email: string): Promise<Account>;
  create(account: Account): Promise<Account>;
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
    const okID = ID.initialize(id);
    const okName = Name.initialize(name);
    const okEmail = await Email.initialize(repository, email);
    const okPassword = Password.initialize(password, passwordConfirmation);

    account.id = okID.value;
    account.name = okName.value;
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
