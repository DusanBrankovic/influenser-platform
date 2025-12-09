import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreateInfluencer, UpdateInfluencer } from "src/influencers/types/influencer.type";

@Injectable()
export class InfluencersRepository {
  constructor(private db: PrismaService) {}

  async createInfluencer(data: CreateInfluencer) {
    return this.db.user.create({ data });
  }

  async update(id: number, data: UpdateInfluencer) {
    return this.db.influencer.update({
      where: { userId: id },
      data,
    });
  }
}
