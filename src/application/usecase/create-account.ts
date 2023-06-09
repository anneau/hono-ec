import { Account, IAccountRepository } from "../../domain/model/account";
import { v4 as uuidv4 } from "uuid";

export class CreateAccountDTO {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

export class CreateAccountUsecase {
  private repository: IAccountRepository;

  constructor(repository: IAccountRepository) {
    this.repository = repository;
  }

  async execute(name: string, email: string, password: string) {
    const account = new Account({ id: uuidv4(), name, email, password });
    const created = await this.repository.create(account);
    return new CreateAccountDTO(created.id, created.name, created.email);
  }
}
