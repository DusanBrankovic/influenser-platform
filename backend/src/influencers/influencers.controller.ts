import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Query,
  ParseBoolPipe,
  ParseIntPipe,
} from "@nestjs/common";
import { InfluencersService } from "./influencers.service";
import { CreateInfluencerDto } from "./dto/create-influencer.dto";
import { UpdateInfluencerDto } from "./dto/update-influencer.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateInfluencerSchema, GetInfluencerSchema } from "./schemas/influencer.schema";
import { GetUser } from "src/auth/get-user.decorator";
import { JwtPayload } from "src/auth/dto/credentials.dto";
import { Roles } from "src/auth/roles.decorator";
import { Public } from "src/auth/public.decorator";
import { SearchQueryDto } from "src/influencers/dto/search-query.dto";

@ApiTags("Influencers")
@Controller("influencers")
export class InfluencersController {
  constructor(private readonly influencersService: InfluencersService) {}

  @ApiOperation({
    summary: "Register a new influencer",
    description:
      "This endpoint creates a new influencer with the provided details.",
  })
  @ApiResponse({
    status: 201,
    description: "Successfully created",
    content: {
      "application/json": {
        schema: CreateInfluencerSchema,
      },
    },
  })
  @Post()
  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createInfluencerDto: CreateInfluencerDto) {
    return this.influencersService.create(createInfluencerDto);
  }

  @ApiOperation({
    summary: "Publish influencer profile",
    description:
      "This endpoint publishes the influencer profile with the provided details.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully published",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Influencer profile published successfully.",
            },
          },
        },
      },
    },
  })
  @Roles("INFLUENCER", "ADMIN")
  @Post("/privacy")
  @HttpCode(HttpStatus.OK)
  publish(
    @GetUser() user: JwtPayload,
    @Query("isPrivate", ParseBoolPipe) isPrivate: boolean
  ) {
    return this.influencersService.setIsPrivate(user.id, isPrivate);
  }

  @ApiOperation({
    summary: "Update my influencer profile",
    description:
      "This endpoint allows the currently logged-in influencer to update their own profile data.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully updated profile",
    type: "InfluencerSchema",
  })
  @Roles("INFLUENCER", "ADMIN")
  @Patch("me")
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: true,
    })
  )
  update(
    @GetUser() user: JwtPayload,
    @Body() updateInfluencerDto: UpdateInfluencerDto
  ) {
    return this.influencersService.update(user.id, updateInfluencerDto);
  }

  @ApiOperation({
    summary: "Search all influencers",
    description: "This endpoint retrieves a list of all influencers.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved",
    content: {
      "application/json": {
        schema: GetInfluencerSchema
      },
    },
  })
  @Public()
  @Get()
  findAll(@Query() searchQuery: SearchQueryDto) {
    return this.influencersService.findAll(searchQuery);
  }

  @ApiOperation({
    summary: "Search one influencer",
    description: "This endpoint retrieves an influencer.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved",
    content: {
      "application/json": {
        schema: GetInfluencerSchema
      },
    },
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number, @GetUser() user: JwtPayload) {
    return this.influencersService.findOne(+id, user);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.influencersService.remove(+id);
  }
}
