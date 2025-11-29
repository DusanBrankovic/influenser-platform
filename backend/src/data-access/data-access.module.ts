import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { InfluencersRepository } from "./influencers/influencers.repository";

@Module({
    providers: [PrismaService, InfluencersRepository],
    exports: [InfluencersRepository],
})
export class DataAccessModule {
}
