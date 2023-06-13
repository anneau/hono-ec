import { Password } from "./password";

describe("Password", () => {
  describe("initialize", () => {
    test("password is less than 6, should throw password error", () => {
      const password = "pass";
      expect(() => Password.initialize(password, password)).toThrow(
        "パスワードは6文字以上で入力してください"
      );
    });

    test("password is more than 255, should throw password error", () => {
      const password = new Array(257).join("a");
      expect(() => Password.initialize(password, password)).toThrow(
        "パスワードは255文字以下で入力してください"
      );
    });

    test("password and passwordConfirmation is not same, should thorw password error", () => {
      const password = "password";
      const passwordConfirmation = "passwordConfirmation";
      expect(() => Password.initialize(password, passwordConfirmation)).toThrow(
        "パスワードとパスワード確認が一致しません"
      );
    });

    test("password is valid, should return password model", () => {
      const password = "password";
      const passwordConfirmation = "password";
      expect(Password.initialize(password, passwordConfirmation)).toStrictEqual(
        Password.reConstructor(password)
      );
    });
  });
});
