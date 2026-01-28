// import { Body, Controller, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
// import { AuthService } from "./auth.service";
// import { Credentials } from "./dto/credentials.dto";
// import { Public } from "./public.decorator";
// import { ApiOperation, ApiResponse } from "@nestjs/swagger";
// import { AccessTokenSchema } from "./schemas/access-token.schema";
// import type { Response, Request } from "express";

// @Controller("auth")
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Public()
//   @Post("login")
//   @ApiOperation({
//       summary: 'Login an existing influencer',
//       description:
//         'This endpoint allows an existing influencer to log in with their credentials.',
//   })
//   @ApiResponse({
//       status: 200,
//       description: 'Successfully logged in',
//       content: {
//         'application/json': {
//           schema: AccessTokenSchema,
//         },
//       },
//     })
//   async login(
//     @Body() credentials: Credentials & { rememberMe: boolean },
//     @Res({ passthrough: true }) res: Response
//   ) {
//     const { accessToken, refreshToken } =
//       await this.authService.login(credentials);

//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "lax",
//       path: "/auth/refresh",
//       maxAge: credentials.rememberMe
//         ? 1000 * 60 * 60 * 24 * 30 // 30 days
//         : undefined, // session cookie
//     });

//     return { accessToken };
//   }

//   @Post("refresh")
//   async refresh(
//     @Req() req: Request,
//     @Res({ passthrough: true }) res: Response
//   ) {
//     const token = req.cookies?.refreshToken;
//     if (!token) throw new UnauthorizedException();

//     const accessToken = await this.authService.refresh(token);

//     return { accessToken };
//   }

//   @Post("logout")
//   logout(@Res({ passthrough: true }) res: Response) {
//     res.clearCookie("refreshToken", {
//       path: "/auth/refresh",
//     });
//     return { message: "Logged out" };
//   }


// }

import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { Credentials } from "./dto/credentials.dto";
import { Public } from "./public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  async login(
    @Body() credentials: Credentials,
    @Res({ passthrough: true }) res: Response
  ) {

    console.log("Login attempt for " + credentials.email);
    const { accessToken, refreshToken } =
      await this.authService.login(credentials);

    // Cookie flags:
    // - Local dev: sameSite="lax", secure=false
    // - Production (Vercel+Railway cross-domain): sameSite="none", secure=true
    const isProd = process.env.NODE_ENV === "production";

    console.log("Setting refresh token cookie with isProd =", isProd);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/auth/refresh",
      maxAge: credentials.rememberMe
        ? 1000 * 60 * 60 * 24 * 30 // 30 days
        : undefined, // session cookie if rememberMe is false
    });

    return { accessToken };
  }

  @Public()
  @Post("refresh")
  async refresh(@Req() req: Request) {

    console.log("Refresh token request received");
    const token = req.cookies?.refreshToken;
    if (!token) throw new UnauthorizedException();

    const accessToken = await this.authService.refresh(token);
    return { accessToken };
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    const isProd = process.env.NODE_ENV === "production";

    // Must match path (+ sameSite/secure to be safe across browsers)
    res.clearCookie("refreshToken", {
      path: "/auth/refresh",
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });

    return { message: "Logged out" };
  }
}

