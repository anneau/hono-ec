import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { AccountRepository } from "./infrastructure/repository/account";
import { CreateAccountUsecase } from "./application/usecase/create-account";
import { schema } from "./api/controller/create-account";
import { initializePrismaClient } from "./infrastructure/datasource/prisma";
import { MeUsecase } from "./application/usecase/me";
import { z } from "zod";

type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => c.json({ message: "Hello World!" }));
app.get("/me", async (c) => {
  const id = "1"; // TODO: 後でJWTから取得するようにする
  const prisma = initializePrismaClient(c.env.DATABASE_URL);
  const repository = new AccountRepository(prisma);
  const usecase = new MeUsecase(repository);
  return c.json(await usecase.execute(id));
});
app.post(
  "/account",
  zValidator(
    "form",
    z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      passwordConfirmation: z.string(),
    })
  ),
  async (c) => {
    const { name, email, password, passwordConfirmation } = c.req.valid("form");
    const prisma = initializePrismaClient(c.env.DATABASE_URL);
    const repository = new AccountRepository(prisma);
    const usecase = new CreateAccountUsecase(repository);
    return c.json(
      await usecase.execute(name, email, password, passwordConfirmation)
    );
  }
);

export default app;
