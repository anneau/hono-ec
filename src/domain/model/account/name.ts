import { z } from "zod";

export class Name {
  public value: string = "";

  static initialize(name: string) {
    const parsed = z.string().min(3).max(255).safeParse(name);
    if (!parsed.success) {
      throw new Error("名前の形式が誤っています");
    }
    const model = new Name();
    model.value = name;
    return model;
  }

  static reConstructor(name: string) {
    const model = new Name();
    model.value = name;
    return model;
  }
}
