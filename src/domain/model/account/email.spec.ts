import { IAccountRepository } from "../account";
import { Email } from "./email";

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
