import { Account } from "./account";

export interface IProductRepository {
  find(id: string): Promise<Product>;
}

class Category {
  public readonly id: string = "";
  public readonly name: string = "";

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class Product {
  public readonly id: string = "";
  public readonly name: string = "";
  public readonly price: number = 0;
  public readonly owner: Account = {} as Account;
  public readonly categories: Category[] = [];

  constructor(id: string, name: string, price: number, owner: Account) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.owner = owner;
  }

  public addCategory(category: Category): void {
    this.categories.push(category);
  }
}
