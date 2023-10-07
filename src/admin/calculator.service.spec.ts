import { Repository } from 'typeorm';
import { CalculatorsService } from './calculators.service';
import { Calculator } from './models/calculator';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateCalculatorRequest,
  UpdateCalculatorRequest,
} from './models/calculator.dto';
import { NotFoundException } from '@nestjs/common';

describe('CalculatorService', () => {
  let calculatorService: CalculatorsService;
  let calculatorRepository: Repository<Calculator>;

  const calculatorRepositoryToken = getRepositoryToken(Calculator);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculatorsService,
        {
          provide: calculatorRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    calculatorService = module.get<CalculatorsService>(CalculatorsService);
    calculatorRepository = module.get<Repository<Calculator>>(
      calculatorRepositoryToken,
    );
  });

  describe('createValidRequest', () => {
    it('should pass validation and save calculator', async () => {
      const newCalculator = <CreateCalculatorRequest>{
        basePrice: 10,
        additionalPackagePrice: 2,
      };

      const calculator = <Calculator>{
        basePrice: 10,
        additionalPackagePrice: 2,
        tariffs: [],
      };

      jest.spyOn(calculatorRepository, 'save').mockReturnValue(undefined);

      await calculatorService.create(newCalculator);

      expect(calculatorRepository.save).toBeCalledWith(calculator);
    });

    it('should pass validation and update calculator', async () => {
      const calculatorId = 12;
      const updatedCalculator = <UpdateCalculatorRequest>{
        basePrice: 10,
        additionalPackagePrice: 2,
      };

      const calculator = <Calculator>{
        basePrice: 10,
        additionalPackagePrice: 2,
        tariffs: [],
      };

      const existingCalculator = <Calculator>{
        basePrice: 1,
        additionalPackagePrice: 4,
        tariffs: [],
      };

      jest
        .spyOn(calculatorRepository, 'findOne')
        .mockReturnValue(Promise.resolve(existingCalculator));
      jest.spyOn(calculatorRepository, 'save').mockReturnValue(undefined);

      await calculatorService.update(calculatorId, updatedCalculator);

      expect(calculatorRepository.findOne).toHaveBeenCalledWith({
        where: { id: calculatorId },
        relations: ['tariffs'],
      });
      expect(calculatorRepository.save).toBeCalledWith(calculator);
    });

    it('should pass validation and fail to update calculator', async () => {
      const calculatorId = 12;
      const updatedCalculator = <UpdateCalculatorRequest>{
        basePrice: 10,
        additionalPackagePrice: 2,
      };

      const existingCalculator = <Calculator>{
        basePrice: 1,
        additionalPackagePrice: 4,
        tariffs: [],
      };

      jest
        .spyOn(calculatorRepository, 'findOne')
        .mockReturnValue(Promise.resolve(existingCalculator));
      jest.spyOn(calculatorRepository, 'save').mockReturnValue(undefined);

      try {
        await calculatorService.update(calculatorId, updatedCalculator);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
