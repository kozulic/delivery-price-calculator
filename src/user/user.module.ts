import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryRequestsController } from './delivery-requests.controller';
import { DeliveryRequestsService } from './delivery-requests.service';
import { DeliveryRequest } from './models/delivery-request';
import { Calculator } from 'src/admin/models/calculator';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryRequest, Calculator])],
  controllers: [DeliveryRequestsController],
  providers: [DeliveryRequestsService],
})
export class UserModule {}
