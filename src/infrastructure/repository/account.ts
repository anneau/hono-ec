import { PrismaClient } from "@prisma/client";
import { Account, IAccountRepository } from "../../domain/model/account";

const prisma = new PrismaClient();

export class AccountRepository implements IAccountRepository {
  async create(account: Account): Promise<Account> {
    const created = await prisma.user.create({
      data: {
        id: account.id,
        name: account.name,
        email: account.email,
        password: account.password,
      },
    });

    return new Account(created);
  }
}
