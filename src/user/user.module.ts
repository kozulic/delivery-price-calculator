import { Module } from '@nestjs/common';
import { DeliveryRequestsController } from './delivery-requests.controller';
import { DeliveryRequestsService } from './delivery-requests.service';

@Module({
  controllers: [DeliveryRequestsController],
  providers: [DeliveryRequestsService],
})
export class UserModule {}
