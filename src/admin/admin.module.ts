import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { CalculatorsController } from './calculators.controller';
import { AdminService } from './admin.service';
import { CalculatorsService } from './calculators.service';

@Module({
  controllers: [AdminController, CalculatorsController],
  providers: [AdminService, CalculatorsService],
})
export class AdminModule {}
