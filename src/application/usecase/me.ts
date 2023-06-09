import { IAccountRepository } from "../../domain/model/account";

class MeDTO {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

export class MeUsecase {
  private repository: IAccountRepository;

  constructor(repository: IAccountRepository) {
    this.repository = repository;
  }

  async execute(id: string) {
    const me = await this.repository.find(id);
    return new MeDTO(me.id, me.name, me.email);
  }
}
