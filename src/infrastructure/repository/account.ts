import { PrismaClient } from "@prisma/client";
import { Account, IAccountRepository } from "../../domain/model/account";

export class AccountRepository implements IAccountRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async find(id: string): Promise<Account> {
    const found = await this.prisma.account.findUnique({
      where: { id },
    });

    return new Promise((resolve, reject) => {
      if (!found) return reject(new Error("アカウントが見つかりませんでした"));
      return resolve(
        Account.reConstructor(found.id, found.name, found.email, found.password)
      );
    });
  }

  async findByEmail(email: string): Promise<Account> {
    const found = await this.prisma.account.findUnique({
      where: { email },
    });

    return new Promise((resolve, reject) => {
      if (!found) return reject(new Error("アカウントが見つかりませんでした"));
      return resolve(
        Account.reConstructor(found.id, found.name, found.email, found.password)
      );
    });
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

    return Account.reConstructor(
      created.id,
      created.name,
      created.email,
      created.password
    );
  }
}
