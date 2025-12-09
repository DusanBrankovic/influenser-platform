import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class Credentials {
  @IsEmail()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AccessTokenData {
  sub: string;
  email: string;
  role: string;
}

export const jwtConstants = {
  secret: process.env.JWT_SECRET || '',
};
