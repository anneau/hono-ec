import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { AccountRepository } from "./infrastructure/repository/account";
import { CreateAccountUsecase } from "./application/usecase/create-account";
import { schema } from "./api/controller/create-account";
import { initializePrismaClient } from "./infrastructure/datasource/prisma";

type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => c.json({ message: "Hello World!" }));
app.post("/account", zValidator("form", schema), async (c) => {
  const { name, email, password } = c.req.valid("form");
  const prisma = initializePrismaClient(c.env.DATABASE_URL);
  const repository = new AccountRepository(prisma);
  const usecase = new CreateAccountUsecase(repository);
  return c.json(await usecase.execute(name, email, password));
});

export default app;
