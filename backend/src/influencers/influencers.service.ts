import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateInfluencerDto } from "./dto/create-influencer.dto";
import { UpdateInfluencerDto } from "./dto/update-influencer.dto";
import { InfluencersRepository } from "src/data-access/influencers.repository";
import { PasswordService } from "src/auth/password.service";
import { SearchQueryDto } from "./dto/search-query.dto";
import { JwtPayload } from "src/auth/dto/credentials.dto";
import { BACKBLAZE } from "src/data-access/bucket/consts";
import { BucketService } from "src/data-access/bucket/bucket.service";
@Injectable()
export class InfluencersService {
  constructor( 
    @Inject(BACKBLAZE) private readonly bucketService: BucketService,
    private influencersRepository: InfluencersRepository,
    private passwordService: PasswordService,
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

  async getIsPrivate(id: number) {
    try {
      const influencer = await this.influencersRepository.findOne(id);
      return influencer!.isPrivate;
    } catch (error) {
      throw new InternalServerErrorException(
        "Influencer not found."
      );
    }
  }

  findAll(searchQuery: SearchQueryDto) {
    return this.influencersRepository.findAll(searchQuery);
  }
  
  async findAllOr(searchQuery: SearchQueryDto) {
    const influencers = await this.influencersRepository.findAllOr(searchQuery);

    return Promise.all(
      influencers.map(async (influencer) => {
        if (influencer.profilePicture) {
          influencer.profilePicture = await this.bucketService.getFile(
            influencer.profilePicture,
            60 * 60,
          );
        }

        return influencer;
      }),
    );
  }

  async findOne(id: number, currentUser?: JwtPayload) {
    const isAdmin = currentUser?.role === 'ADMIN';
    const isOwner = currentUser?.id === id;

    const onlyPublic = !(isAdmin || isOwner);

    const influencer = await this.influencersRepository.findOne(id, onlyPublic);

    if (!influencer) {
      throw new NotFoundException(
        `Influencer with ID ${id} not found or is private.`,
      );
    }

    if (influencer.profilePicture) {
      influencer.profilePicture = await this.bucketService.getFile(
        influencer.profilePicture,
        60 * 60,
      );
    }

    return influencer;
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
 

  
  // async updateProfilePicture(userId: number, file: Express.Multer.File) {
  //     if (!file) throw new BadRequestException("No file uploaded");
  //     if (!file.mimetype?.startsWith("image/")) throw new BadRequestException("Only image files are allowed");
      
  //     const [uploadResult] = await this.bucketService.uploadFiles([file], userId);
  //     const { dbUrl, signedUrl } = uploadResult;

  //     const existing = await this.influencersRepository.findOne(userId);
  //     if (existing?.profilePicture) {
  //       try {
  //         await this.bucketService.deleteFile(existing.profilePicture);
  //       } catch (err) {
  //         console.error("Failed to delete old profile picture", err);
  //       }
  //     }
  
  //     const updated = await this.influencersRepository.update(userId, { profilePicture: dbUrl });
  
  //     return { ...updated, profilePicture: signedUrl };
  //   }
  

async updateInfluencerPhoto(userId: number, file: Express.Multer.File, what: "profilePicture" | "coverPhoto") {
      if (!file) throw new BadRequestException("No file uploaded");
      if (!file.mimetype?.startsWith("image/")) throw new BadRequestException("Only image files are allowed");
      

      const [uploadResult] = await this.bucketService.uploadFiles([file], userId);
      const { dbUrl, signedUrl } = uploadResult;

      const existing = await this.influencersRepository.findOne(userId);
      if (existing?.[what] && existing[what] !== dbUrl) {
        try {
          await this.bucketService.deleteFile(existing[what]);
        } catch (err) {
          console.error("Failed to delete old profile picture", err);
        }
      }
  
      const updated = await this.influencersRepository.update(userId, { [what]: dbUrl });
  
      return { ...updated, [what]: signedUrl };
    }


  async remove(id: number) {
    try{
      const influencer = await this.influencersRepository.findOne(id);
    
      if (!influencer) {
        throw new NotFoundException(`Influencer sa ID-jem ${id} nije pronađen.`);
      }
      const isDeleted = true;
      await this.influencersRepository.update(id, {isDeleted});
      return {message: "Deleted successfuly"}
      
    }
    catch(err){
      console.log("problem u inf servisu 163")
      return 'Something bad happened';
    }
  }
}
