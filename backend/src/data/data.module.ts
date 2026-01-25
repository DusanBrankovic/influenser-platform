import { Module } from "@nestjs/common";
import { DataAccessModule } from "src/data-access/data-access.module";
import { AuthModule } from "src/auth/auth.module";
import { DataController } from "./data.controller";
import { DataService } from "./data.service";

@Module({
  imports: [DataAccessModule, AuthModule],
  controllers: [DataController],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
