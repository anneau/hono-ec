import { ID, Name, Password, IAccountRepository, Email } from "./account";

describe("ID", () => {
  describe("initialize", () => {
    test("id is not uuid, should throw uuid error", () => {
      const id = "hogehoge";
      expect(() => ID.initialize(id)).toThrow("IDがUUID形式ではありません");
    });
  });
});

describe("Name", () => {
  describe("initialize", () => {
    test("name is not valid, should throw name error", () => {
      const name = "h";
      expect(() => Name.initialize(name)).toThrow("名前の形式が誤っています");
    });
  });
});

describe("Email", () => {
  describe("initialize", () => {
    test("email is not email, should throw email error", async () => {
      const repository = {
        findByEmail: jest.fn().mockImplementation(async () => ({})),
      };
      const email = "hogehoge";
      await expect(
        Email.initialize(repository as unknown as IAccountRepository, email)
      ).rejects.toThrow("メールアドレスの形式が誤っています");
    });

    test("email is already exist, should throw email error", async () => {
      const repository = {
        findByEmail: jest.fn().mockImplementation(async () => ({})),
      };
      const email = "hogehoge@example.com";
      await expect(
        Email.initialize(repository as unknown as IAccountRepository, email)
      ).rejects.toThrow("メールアドレスが既に存在しています");
    });

    test("email is not exist, should return model", async () => {
      const repository = {
        findByEmail: jest.fn().mockImplementation(async () => {
          return await Promise.reject(
            new Error("アカウントが見つかりませんでした")
          );
        }),
      };
      const email = "hogehoge@example.com";
      await expect(
        Email.initialize(repository as unknown as IAccountRepository, email)
      ).resolves.toStrictEqual(Email.reConstructor(email));
    });
  });
});

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
