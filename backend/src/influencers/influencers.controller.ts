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
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { InfluencersService } from "./influencers.service";
import { CreateInfluencerDto } from "./dto/create-influencer.dto";
import { UpdateInfluencerDto } from "./dto/update-influencer.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  CreateInfluencerSchema,
  GetInfluencerSchema,
} from "./schemas/influencer.schema";
import { GetUser } from "src/auth/get-user.decorator";
import { JwtPayload } from "src/auth/dto/credentials.dto";
import { Roles } from "src/auth/roles.decorator";
import { Public } from "src/auth/public.decorator";
import { SearchQueryDto } from "src/influencers/dto/search-query.dto";
import { ProfilePictureSchema } from "./schemas/profilePictureSchema";

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
  publish(@GetUser() user: JwtPayload, @Body("isPrivate") isPrivate: boolean) {
    return this.influencersService.setIsPrivate(user.id, isPrivate);
  }

   @ApiOperation({
    summary: "Is profile published",
    description:
      "This endpoint checks if the influencer profile is published.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully checked publication status",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Successfully checked publication status.",
            },
          },
        },
      },
    },
  })
  @Roles("INFLUENCER", "ADMIN")
  @Get("/privacy")
  @HttpCode(HttpStatus.OK)
  isPublished(
    @GetUser() user: JwtPayload
  ) {
    return this.influencersService.getIsPrivate(user.id);
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
    }),
  )
  update(
    @GetUser() user: JwtPayload,
    @Body() updateInfluencerDto: UpdateInfluencerDto,
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
        schema: GetInfluencerSchema,
      },
    },
  })
  @Public()
  @Get()
  findAll(@Query() searchQuery: SearchQueryDto) {
    return this.influencersService.findAll(searchQuery);
  }
  
  
  /////
  @ApiOperation({
    summary: "Search all influencers",
    description: "This endpoint retrieves a list of all influencers.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved",
    content: {
      "application/json": {
        schema: GetInfluencerSchema,
      },
    },
  })
  @Public()
  @Get("/or")
  findAllOr(@Query() searchQuery: SearchQueryDto) {
    return this.influencersService.findAllOr(searchQuery);
  }
  /////

  @ApiOperation({
    summary: "Search one influencer",
    description: "This endpoint retrieves an influencer.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved",
    content: {
      "application/json": {
        schema: GetInfluencerSchema,
      },
    },
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number, @GetUser() user: JwtPayload) {
    return this.influencersService.findOne(+id, user);
  }

  @ApiOperation({
    summary: "Update INFLUENCER profilePicture",
    description: "This endpoint updates INFLUENCER profilePicture.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully updated",
    content: {
      "application/json": {
        schema: ProfilePictureSchema,
      },
    },
  })
  @Roles("INFLUENCER")
  @Patch("me/profile-picture")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor("image"))
  async updateProfilePicture(
    @GetUser() user: JwtPayload,
    @UploadedFile() image: Express.Multer.File,
  ) {
    // console.log("###############: ", image?.originalname, "type", image.mimetype, " size: ", image.size)
    return this.influencersService.updateInfluencerPhoto(+user.id, image, "profilePicture");
  }


   @ApiOperation({
    summary: "Update INFLUENCER coverPhoto",
    description: "This endpoint updates INFLUENCER coverPhoto.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully updated",
    content: {
      "application/json": {
        schema: ProfilePictureSchema,
      },
    },
  })
  @Roles("INFLUENCER")
  @Patch("me/cover-photo")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor("image"))
  async updateCoverPhoto(
    @GetUser() user: JwtPayload,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.influencersService.updateInfluencerPhoto(+user.id, image, "coverPhoto");
  }

   @ApiOperation({
    summary: "delete influencer",
    description: "This endpoint deletes INFLUENCER.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully deleted",
  })
  @Roles("INFLUENCER", "ADMIN")
  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  remove(@GetUser() user: JwtPayload) {
    return this.influencersService.remove(+user.id);
  }
}
