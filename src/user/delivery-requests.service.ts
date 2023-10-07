import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateDeliveryRequest } from './models/delivery-request.dto';
import { mapDeliveryRequest } from './delivery-request-mapper';
import { DeliveryRequest } from './models/delivery-request';
import { validateDeliveryRequest } from './delivery-price-request-validator';
import { Calculator } from '../admin/models/calculator';
import {
  buildConfirmationMessage,
  calculatePrice,
} from '../shared/calculation-utils';

@Injectable()
export class DeliveryRequestsService {
  constructor(
    @InjectRepository(DeliveryRequest)
    private readonly deliveryRequestRepository: Repository<DeliveryRequest>,
    @InjectRepository(Calculator)
    private readonly calculatorRepository: Repository<Calculator>,
    private readonly mailerService: MailerService,
  ) {}

  async create(request: CreateDeliveryRequest): Promise<void> {
    validateDeliveryRequest(request);

    const deliveryRequest = mapDeliveryRequest(request);

    await this.deliveryRequestRepository.save(deliveryRequest);

    const calculators = await this.calculatorRepository.find({
      relations: ['tariffs'],
    });

    if (!calculators || calculators?.length === 0) {
      throw new NotFoundException('No calculator is found.');
    }

    const calculator = calculators[0];

    const deliveryPrice = calculatePrice(calculator, deliveryRequest);

    deliveryRequest.price = deliveryPrice;
    await this.deliveryRequestRepository.save(deliveryRequest);

    const confirmationMessage = buildConfirmationMessage(deliveryRequest);

    await this.mailerService.sendMail({
      to: deliveryRequest.email,
      from: process.env.SENDER_MAIL,
      subject: 'About your delivery',
      text: confirmationMessage,
    });
  }
}
