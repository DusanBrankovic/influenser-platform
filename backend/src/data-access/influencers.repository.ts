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

  async getAll() {
    const influencers = await this.db.influencer.findMany({
      include: {
        user: {
          select: {
            email: true,
            role: true,
          },
        },
      },
    });

    return influencers.map((i) => ({
      ...i,
      email: i.user.email,
      role: i.user.role,
    }));
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
    const { name, industry, value, experience_range } = searchQuery;
  
    const filters: any = {};
  
    if (name) {
      filters.name = {
        contains: name,
        mode: "insensitive",
      };
    }
  
    if (industry) {
      
      filters.industries = Array.isArray(industry) 
        ? { hasSome: industry } 
        : { has: industry };
    }
  
    if (value) {
      filters.values = Array.isArray(value) 
        ? { hasSome: value } 
        : { has: value };
    }
  
    if (experience_range) {
        const exp = Number(experience_range);
        filters.experience = {
          gte: exp - 1, 
          lte: exp,     
        };
      }
  
    return this.db.influencer.findMany({
      select: {
        userId: true,
        name: true,
        description: true,
        experience: true,
        industries: true,
        values: true,
      },
      where: { ...filters, isPrivate: false, isDeleted: false  },
    });
  }
  
  
  async findAllOr(searchQuery: SearchQueryDto) {
    const { name, industry, value, experience_range } = searchQuery; // Pazi na 'e'
    const orFilters: any[] = [];
  
    if (name) {
      orFilters.push({ name: { contains: name, mode: "insensitive" } });
    }
  
    // Koristimo hasSome za nizove jer je fleksibilniji
    if (industry && Array.isArray(industry) && industry.length > 0) {
      orFilters.push({ industries: { hasSome: industry } });
    }
  
    if (value && Array.isArray(value) && value.length > 0) {
      orFilters.push({ values: { hasSome: value } });
    }
  
    if (experience_range) {
      const exp = Number(experience_range);
      orFilters.push({
        experience: { gte: exp - 1, lte: exp }
      });
    }
  
    return this.db.influencer.findMany({
      where: {
        isPrivate: false,
        isDeleted: false ,
        ...(orFilters.length > 0 ? { OR: orFilters } : {}),
      },
      select: {
        userId: true,
        name: true,
        experience: true,
        industries: true,
        values: true,
      },
    });
  }


  async findOne(id: number, onlyPublic: boolean = false) {
    return this.db.influencer.findUnique({
      where: { userId: id, isDeleted: false, ...(onlyPublic ? { isPrivate: false } : {})},
    });
  }
}
