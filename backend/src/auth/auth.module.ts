import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { DataAccessModule } from "src/data-access/data-access.module";
import { PasswordService } from "./password.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./dto/credentials.dto";

@Module({
  imports: [
    DataAccessModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
})
export class AuthModule {}
