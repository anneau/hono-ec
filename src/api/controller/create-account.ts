import { z } from "zod";

export const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "3文字以上で入力してください" })
      .max(255, { message: "255文字以下で入力してください" }),
    email: z
      .string()
      .email({ message: "メールアドレスの形式が正しくありません" }),
    password: z
      .string()
      .min(6, { message: "6文字以上で入力してください" })
      .max(255, { message: "255文字以下で入力してください" }),
    passwordConfirmation: z
      .string()
      .min(6, { message: "6文字以上で入力してください" })
      .max(255, { message: "255文字以下で入力してください" }),
  })
  .superRefine(({ password, passwordConfirmation }) => {
    if (password !== passwordConfirmation) {
      return {
        message: "パスワードとパスワード確認が一致しません",
      };
    }
    return true;
  });
