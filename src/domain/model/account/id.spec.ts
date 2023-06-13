import { ID } from "./id";

describe("ID", () => {
  describe("initialize", () => {
    test("id is not uuid, should throw uuid error", () => {
      const id = "hogehoge";
      expect(() => ID.initialize(id)).toThrow("IDがUUID形式ではありません");
    });
  });
});
