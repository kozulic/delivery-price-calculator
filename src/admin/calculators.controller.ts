import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CalculatorsService } from './calculators.service';
import {
  CreateCalculatorRequest,
  UpdateCalculatorRequest,
} from './models/calculator.dto';
import { AuthGuard } from 'src/shared/auth.guard';

@Controller('calculators')
export class CalculatorsController {
  constructor(private readonly calculatorsService: CalculatorsService) {}

  @ApiTags('Calculators')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() request: CreateCalculatorRequest): Promise<void> {
    await this.calculatorsService.create(request);
  }

  @ApiTags('Calculators')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateCalculatorRequest,
  ): Promise<void> {
    return this.calculatorsService.update(id, request);
  }
}
