import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import {
  CreateBusiness,
  UpdateBusiness,
} from "src/businesses/types/business.type";

@Injectable()
export class BusinessRepository {
  constructor(private db: PrismaService) {}

  async createBusiness(data: CreateBusiness) {
    const userData = {
      email: data.email,
      password: data.password,
      role: data.role,
    };
    const businessData = {
      name: data.name,
    };
    const user = await this.db.user.create({ data: { ...userData } });
    const business = await this.db.business.create({
      data: { ...businessData, userId: user.id },
    });
    return { ...business, email: user.email, role: user.role };
  }

  async update(id: number, data: UpdateBusiness) {
    return this.db.business.update({
      where: {
        userId: id,
      },
      data: data,
    });

  }
}