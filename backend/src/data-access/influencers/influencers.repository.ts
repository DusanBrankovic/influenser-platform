import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateInfluencer } from "./influencer.type";

@Injectable()
export class InfluencersRepository {
  constructor(private db: PrismaService) {}

  async createInfluencer(data: CreateInfluencer) {
    return this.db.user.create({ data });
  }
}
