import { Account } from "../../domain/model/account";
import { AccountRepository } from "../../infrastructure/repository/account";
import { v4 as uuidv4 } from "uuid";

export class CreateAccount {
  private repository: AccountRepository;

  constructor(repository: AccountRepository) {
    this.repository = repository;
  }

  async execute(name: string, email: string, password: string) {
    const account = new Account({ id: uuidv4(), name, email, password });
    return await this.repository.create(account);
  }
}
