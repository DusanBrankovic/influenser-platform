import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { InfluencersRepository } from "./influencers.repository";
import { UsersRepository } from "./users.repository";
import { BusinessRepository } from "./businesses.repository";


@Module({
    providers: [PrismaService, InfluencersRepository, UsersRepository, BusinessRepository],
    exports: [InfluencersRepository, UsersRepository, BusinessRepository],
})
export class DataAccessModule {
}
