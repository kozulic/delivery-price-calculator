import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeliveryRequestsService } from './delivery-requests.service';
import { CreateDeliveryRequest } from './models/delivery-request.dto';

@Controller('delivery-requests')
export class DeliveryRequestsController {
  constructor(
    private readonly deliveryRequestsService: DeliveryRequestsService,
  ) {}

  @ApiTags('Delivery Requests')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() request: CreateDeliveryRequest): Promise<void> {
    await this.deliveryRequestsService.create(request);
  }
}
