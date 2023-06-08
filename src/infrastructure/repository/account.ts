import { PrismaClient } from "@prisma/client";
import { Account, IAccountRepository } from "../../domain/model/account";

const prisma = new PrismaClient();

export class AccountRepository implements IAccountRepository {
  async create(account: Account): Promise<Account> {
    const { id, name, email, password } = account;
    const created = await prisma.user.create({
      data: {
        id,
        name,
        email,
        password,
      },
    });

    return new Account(created);
  }
}
