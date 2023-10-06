import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { CalculatorsController } from './calculators.controller';
import { AdminService } from './admin.service';
import { CalculatorsService } from './calculators.service';
import { Admin } from './models/admin';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tariff } from './models/tariff';
import { Calculator } from './models/calculator';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Calculator, Tariff])],
  controllers: [AdminController, CalculatorsController],
  providers: [AdminService, CalculatorsService],
})
export class AdminModule {}
