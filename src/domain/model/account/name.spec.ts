import { Name } from "./name";

describe("Name", () => {
  describe("initialize", () => {
    test("name is not valid, should throw name error", () => {
      const name = "h";
      expect(() => Name.initialize(name)).toThrow("名前の形式が誤っています");
    });
  });
});
