import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class Credentials {
  @IsEmail()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export const jwtConstants = {
  secret: process.env.JWT_SECRET || '',
};
