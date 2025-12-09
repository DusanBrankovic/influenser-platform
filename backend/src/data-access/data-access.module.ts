import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { InfluencersRepository } from "./influencers.repository";
import { UsersRepository } from "./users.repository";


@Module({
    providers: [PrismaService, InfluencersRepository, UsersRepository],
    exports: [InfluencersRepository, UsersRepository],
})
export class DataAccessModule {
}
