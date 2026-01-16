import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BusinessRepository } from 'src/data-access/businesses.repository';
import { PasswordService } from "src/auth/password.service";

@Injectable()
export class BusinessesService {

  constructor(
      private businessesRepository: BusinessRepository,
      private passwordService: PasswordService
    ) { }

  async create(createBusinessDto: CreateBusinessDto) {
    createBusinessDto.password = await this.passwordService.hash(
      createBusinessDto.password
    );

    try { return await this.businessesRepository.createBusiness(createBusinessDto); }

    catch (error) {
      if (error.code === "P2002") {
        return { message: "Email already exists." };
      }
      return {
        message: "Failed to create business.",
      };
    }
  }

  findAll() {
    return `This action returns all businesses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} business`;
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
