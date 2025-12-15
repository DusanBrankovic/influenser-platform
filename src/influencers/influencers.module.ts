import { Module } from "@nestjs/common";
import { InfluencersService } from "./influencers.service";
import { InfluencersController } from "./influencers.controller";
import { DataAccessModule } from "src/data-access/data-access.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [DataAccessModule, AuthModule],
  controllers: [InfluencersController],
  providers: [InfluencersService],
})
export class InfluencersModule {}
