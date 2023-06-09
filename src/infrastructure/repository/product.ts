import { PrismaClient } from "@prisma/client";
import { IProductRepository, Product } from "../../domain/model/product";

export class ProductRepository implements IProductRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  public async find(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
        categories: true,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // MEMO: 一発で取れないか調べる
    const categories = await this.prisma.category.findMany({
      where: {
        id: {
          in: product.categories.map(({ categoryId }) => categoryId),
        },
      },
    });

    const model = new Product(
      product.id,
      product.name,
      product.price,
      product.owner
    );
    categories.forEach((category) => {
      model.addCategory(category);
    });

    return model;
  }
}
