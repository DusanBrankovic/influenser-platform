import { Injectable } from "@nestjs/common";
import { CreateInfluencerDto } from "./dto/create-influencer.dto";
import { UpdateInfluencerDto } from "./dto/update-influencer.dto";
import { InfluencersRepository } from "src/data-access/influencers/influencers.repository";

@Injectable()
export class InfluencersService {
  constructor(private influencersRepository: InfluencersRepository) {}
  create(createInfluencerDto: CreateInfluencerDto) {
    return this.influencersRepository.createInfluencer({...createInfluencerDto, role: 'INFLUENCER'});
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
