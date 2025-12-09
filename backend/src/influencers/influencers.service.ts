import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateInfluencerDto } from "./dto/create-influencer.dto";
import { UpdateInfluencerDto } from "./dto/update-influencer.dto";
import { InfluencersRepository } from "src/data-access/influencers.repository";
import { PasswordService } from "src/auth/password.service";

@Injectable()
export class InfluencersService {
  constructor(
    private influencersRepository: InfluencersRepository,
    private passwordService: PasswordService
  ) {}
  async create(createInfluencerDto: CreateInfluencerDto) {
    const hashedPassword = await this.passwordService.hash(
      createInfluencerDto.password
    );
    createInfluencerDto.password = hashedPassword;
    try {
      const influencer =
        await this.influencersRepository.createInfluencer(createInfluencerDto);
      return influencer;
    } catch (error) {
      if (error.code === "P2002") {
        return { message: "Email already exists." };
      }
      return {
        message: "Failed to create influencer.",
      };
    }
  }

  async publish(id: number) {
    try {
      await this.influencersRepository.update(id, { isPrivate: false });
      return { message: "Influencer profile published successfully." };
    } catch (error) {
      throw new InternalServerErrorException(
        "Failed to publish influencer profile."
      );
    }
  }

  findAll() {
    return `This action returns all influencers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} influencer`;
  }

  update(id: number, updateInfluencerDto: UpdateInfluencerDto) {
    return `This action updates a #${id} influencer`;
  }

  remove(id: number) {
    return `This action removes a #${id} influencer`;
  }
}
