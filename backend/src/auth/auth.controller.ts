import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Credentials } from "./dto/credentials.dto";
import { Public } from "./public.decorator";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AccessTokenSchema } from "./schemas/access-token.schema";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  @ApiOperation({
      summary: 'Login an existing influencer',
      description:
        'This endpoint allows an existing influencer to log in with their credentials.',
  })
  @ApiResponse({
      status: 200,
      description: 'Successfully logged in',
      content: {
        'application/json': {
          schema: AccessTokenSchema,
        },
      },
    })
  login(@Body() credentials: Credentials) {
    return this.authService.login(credentials);
  }
}
