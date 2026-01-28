import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Credentials } from "./dto/credentials.dto";
import { UsersRepository } from "src/data-access/users.repository";
import { PasswordService } from "./password.service";
import { StringValue } from "ms";

type JwtPayload = { sub: number; email: string; role: string };

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private passwordService: PasswordService
  ) {}

  async login(credentials: Credentials): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.usersRepository.findByEmail(credentials.email);
    if (!user) throw new UnauthorizedException();

    const isPasswordValid = await this.passwordService.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) throw new ForbiddenException();

    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN as StringValue) || "15m",
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: (process.env.REFRESH_TOKEN_EXPIRES_IN as StringValue) || "30d",
    });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string): Promise<string> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const newAccessToken = await this.jwtService.signAsync(
        { sub: payload.sub, email: payload.email, role: payload.role },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN as StringValue) || "15m",
        }
      );

      return newAccessToken;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
