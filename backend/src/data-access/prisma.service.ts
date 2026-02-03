import "dotenv/config";
import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString || typeof connectionString !== "string") {
      throw new Error("DATABASE_URL is not set or not a string");
    }
    const adapter = new PrismaPg({
      connectionString,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on("beforeExit", async () => {
      await app.close();
    });
  }
}
