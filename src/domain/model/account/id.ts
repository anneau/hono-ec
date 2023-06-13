import { z } from "zod";

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
