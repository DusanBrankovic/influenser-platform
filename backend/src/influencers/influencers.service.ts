import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateInfluencerDto } from "./dto/create-influencer.dto";
import { UpdateInfluencerDto } from "./dto/update-influencer.dto";
import { InfluencersRepository } from "src/data-access/influencers.repository";
import { PasswordService } from "src/auth/password.service";

@Injectable()
export class InfluencersService {
  constructor(
    private influencersRepository: InfluencersRepository,
    private passwordService: PasswordService
  ) { }
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

  async setIsPrivate(id: number, isPrivate = false) {
    try {
      await this.influencersRepository.update(id, { isPrivate });
      return { message: "Influencer profile privacy updated successfully." };
    } catch (error) {
      throw new InternalServerErrorException(
        "Failed to update influencer profile privacy."
      );
    }
  }

  findAll() {
    return `This action returns all influencers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} influencer`;
  }


  async update(id: number, data: UpdateInfluencerDto) {

    if (!data || Object.keys(data).length === 0) throw new BadRequestException("No data sent to be updated");

    try {
      const updatedProfile = await this.influencersRepository.update(
        id, 
        data 
      );

      if (!updatedProfile) {
        return { message: `Influencer with ID ${id} not found.` };
      }

      return updatedProfile;

    } catch (error) {
      console.error("Update error:", error);
      throw new InternalServerErrorException("Failed to update influencer profile.");
    }
  }
 

  remove(id: number) {
    return `This action removes a #${id} influencer`;
  }
}
