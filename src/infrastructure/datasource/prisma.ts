import { PrismaClient } from "@prisma/client/edge";

export const initializePrismaClient = (databaseURL: string) => {
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseURL,
      },
    },
  });
};
