import { Module } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';
import { DataAccessModule } from "src/data-access/data-access.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [DataAccessModule, AuthModule],
  controllers: [BusinessesController],
  providers: [BusinessesService],
})
export class BusinessesModule {}
