import { Injectable, NotFoundException } from '@nestjs/common';
import { Calculator } from './models/calculator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCalculatorRequest,
  UpdateCalculatorRequest,
} from './models/calculator.dto';
import { mapCalculatorRequest } from './calculator-mapper';
import { validateCalculatorRequest } from './calculator-request-validator';

@Injectable()
export class CalculatorsService {
  constructor(
    @InjectRepository(Calculator)
    private readonly calculatorRepository: Repository<Calculator>,
  ) {}

  async create(request: CreateCalculatorRequest): Promise<void> {
    validateCalculatorRequest(request);

    const calculator = mapCalculatorRequest(request);

    await this.calculatorRepository.save(calculator);
  }

  async update(id: number, request: UpdateCalculatorRequest): Promise<void> {
    validateCalculatorRequest(request);

    const calculator = await this.calculatorRepository.findOne({
      where: { id },
      relations: ['tariffs'],
    });

    if (!calculator) {
      throw new NotFoundException(`Calculator with id [${id}] not found.`);
    }

    mapCalculatorRequest(request, calculator);

    this.calculatorRepository.save(calculator);
  }
}
