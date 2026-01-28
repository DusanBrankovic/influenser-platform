import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class Credentials {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  rememberMe: boolean;
}


export class JwtPayload {
  id: number;
  email: string;
  role: string;
}

export const jwtConstants = {
  secret: process.env.JWT_ACCESS_SECRET || "",
};
