import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Credentials } from "./dto/credentials.dto";
import { UsersRepository } from "src/data-access/users.repository";
import { PasswordService } from "./password.service";

@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
        private passwordService: PasswordService
    ) {}

    async login(
    credentials: Credentials
  ): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findByEmail(credentials.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await this.passwordService.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}