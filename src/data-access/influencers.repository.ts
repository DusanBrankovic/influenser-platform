import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreateInfluencer, UpdateInfluencer } from "src/influencers/types/influencer.type";

@Injectable()
export class InfluencersRepository {
  constructor(private db: PrismaService) {}

  async createInfluencer(data: CreateInfluencer) {
    const userData = {
      email: data.email,
      password: data.password,
      role: data.role,
    };
    const influencerData = {
      name: data.name,
      headline: data.headline,
    };
    const user = await this.db.user.create({ data: { ...userData} });
    const influencer = await this.db.influencer.create({
      data: { ...influencerData, userId: user.id },
    });
    return {...influencer, email: user.email, role: user.role };
  }

  async update(id: number, data: UpdateInfluencer) {
    return this.db.influencer.update({
      where: { userId: id },
      data,
    });
  }
}
