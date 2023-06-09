import { PrismaClient } from "@prisma/client";
import { Account, IAccountRepository } from "../../domain/model/account";

export class AccountRepository implements IAccountRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async create(account: Account): Promise<Account> {
    const { id, name, email, password } = account;
    const created = await this.prisma.account.create({
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
