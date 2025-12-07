import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private db: PrismaService) {}

  async findByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }
}
