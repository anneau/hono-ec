import { z } from "zod";
import { IAccountRepository } from "../account";

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
