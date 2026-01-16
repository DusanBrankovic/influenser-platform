import { Controller,
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
  ParseBoolPipe, } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "src/auth/public.decorator";
import { BusinessSchema } from "./schemas/business.schema"
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @ApiOperation({
      summary: "Register a new business",
      description:
        "This endpoint creates a new business with the provided details.",
    })
    @ApiResponse({
      status: 201,
      description: "Successfully created",
      content: {
        "application/json": {
          schema: BusinessSchema,
        },
      },
    })
    @Post()
    @Public()
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createBusinessDto: CreateBusinessDto) {
      return this.businessesService.create(createBusinessDto);
    }

  @Get()
  findAll() {
    return this.businessesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessesService.update(+id, updateBusinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessesService.remove(+id);
  }
}
