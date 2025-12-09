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
} from "@nestjs/common";
import { InfluencersService } from "./influencers.service";
import { CreateInfluencerDto } from "./dto/create-influencer.dto";
import { UpdateInfluencerDto } from "./dto/update-influencer.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InfluencerSchema } from "./schemas/influencer.schema";
import { GetUser } from "src/auth/get-user.decorator";
import { JwtPayload } from "src/auth/dto/credentials.dto";
import { Roles } from "src/auth/roles.decorator";
import { Public } from "src/auth/public.decorator";

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
        schema: InfluencerSchema,
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
  @Post("/publish")
  @HttpCode(HttpStatus.OK)
  publish(@GetUser() user: JwtPayload) {
    return this.influencersService.publish(user.id);
  }

  @Get()
  findAll() {
    return this.influencersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.influencersService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateInfluencerDto: UpdateInfluencerDto
  ) {
    return this.influencersService.update(+id, updateInfluencerDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.influencersService.remove(+id);
  }
}
