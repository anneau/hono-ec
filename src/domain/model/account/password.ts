import { z } from "zod";

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
