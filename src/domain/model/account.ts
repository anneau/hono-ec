import { z } from "zod";

export interface IAccountRepository {
  find(id: string): Promise<Account>;
  findByEmail(email: string): Promise<Account>;
  create(account: Account): Promise<Account>;
}

export class ID {
  public value: string = "";

  static initialize(id: string) {
    const parsed = z.string().uuid().safeParse(id);
    if (!parsed.success) {
      throw new Error("IDがUUID形式ではありません");
    }
    const model = new ID();
    model.value = id;
    return model;
  }

  static reConstructor(id: string) {
    const model = new ID();
    model.value = id;
    return model;
  }
}

export class Name {
  public value: string = "";

  static initialize(name: string) {
    const parsed = z.string().min(3).max(255).safeParse(name);
    if (!parsed.success) {
      throw new Error("名前の形式が誤っています");
    }
    const model = new ID();
    model.value = name;
    return model;
  }

  static reConstructor(name: string) {
    const model = new Name();
    model.value = name;
    return model;
  }
}

export class Email {
  public value: string = "";

  static async initialize(repository: IAccountRepository, email: string) {
    const parsed = await z
      .string()
      .email({ message: "メールアドレスの形式が誤っています" })
      .refine(
        async (e) => {
          try {
            await repository.findByEmail(e);
            return false;
          } catch (e) {
            return true;
          }
        },
        { message: "メールアドレスが既に存在しています" }
      )
      .safeParseAsync(email);
    if (!parsed.success) {
      // TODO: うまく複数のエラーを返せるようにする
      throw new Error(parsed.error.errors[0].message);
    }
    const model = new Email();
    model.value = parsed.data;
    return model;
  }

  static reConstructor(email: string) {
    const model = new Email();
    model.value = email;
    return model;
  }
}

export class Password {
  public value: string = "";

  static initialize(password: string, passwordConfirmation: string) {
    const parsed = z
      .string()
      .min(6, { message: "パスワードは6文字以上で入力してください" })
      .max(255, { message: "パスワードは255文字以下で入力してください" })
      .refine(
        (p) => {
          return p === passwordConfirmation;
        },
        { message: "パスワードとパスワード確認が一致しません" }
      )
      .safeParse(password);
    if (!parsed.success) {
      throw new Error(parsed.error.errors[0].message);
    }
    const model = new Password();
    model.value = parsed.data;
    return model;
  }

  static reConstructor(password: string) {
    const model = new Password();
    model.value = password;
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
