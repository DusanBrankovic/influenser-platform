import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import {
  CreateInfluencer,
  UpdateInfluencer,
} from "src/influencers/types/influencer.type";
import { SearchQueryDto } from "src/influencers/dto/search-query.dto";

@Injectable()
export class InfluencersRepository {
  constructor(private db: PrismaService) {}

  async createInfluencer(data: CreateInfluencer) {

    const { email, password, role, ...influencerData } = data;

    const userData = { email, password, role };

    const user = await this.db.user.create({ data: { ...userData } });

    const influencer = await this.db.influencer.create({
      data: { ...influencerData, userId: user.id },
    });

    return { ...influencer, email: user.email, role: user.role };
  }

  async update(id: number, data: UpdateInfluencer) {
    return this.db.influencer.update({
      where: {
        userId: id,
      },
      data: data,
    });
  }

  async findAll(searchQuery: SearchQueryDto) {
    const { name, industry, value } = searchQuery;

    const filters: any = {};

    if (name) {
      filters.name = {
        contains: name,
        mode: "insensitive",
      };
    }

    if (industry) {
      filters.industries = {
        has: industry,
      };
    }

    if (value) {
      filters.values = {
        has: value,
      };
    }

    return this.db.influencer.findMany({
      select: {
        userId: true,
        name: true,
        headline: true,
        experience: true,
        industries: true,
        values: true,
      },
      where: { ...filters, isPrivate: false },
    });
  }

  async findOne(id: number, onlyPublic: boolean = false) {
    return this.db.influencer.findUnique({
      where: { userId: id, ...(onlyPublic ? { isPrivate: false } : {}) }
    });
  }
}
