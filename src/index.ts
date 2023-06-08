import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { AccountRepository } from "./infrastructure/repository/account";
import { CreateAccountUsecase } from "./application/usecase/create-account";
import { schema } from "./api/controller/create-account";

const app = new Hono();

app.get("/", (c) => c.json({ message: "Hello World!" }));
app.post("/account", zValidator("form", schema), async (c) => {
  const { name, email, password } = c.req.valid("form");
  const repository = new AccountRepository();
  const usecase = new CreateAccountUsecase(repository);
  return c.json(await usecase.execute(name, email, password));
});

export default app;
