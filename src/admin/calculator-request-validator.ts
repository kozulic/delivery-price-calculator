import { BadRequestException } from '@nestjs/common';
import { isNumberOutOfRange } from '../shared/validation-utils';
import { BaseCalculatorRequest, TariffDto } from './models/calculator.dto';

export function validateCalculatorRequest(request: BaseCalculatorRequest) {
  const { basePrice, additionalPackagePrice, tariffs } = request;

  const errors = {};

  // Hard to imagine base price is higher than 1000.
  if (isNumberOutOfRange(basePrice, 1, 1000)) {
    errors['basePrice'] = `[${basePrice}] is out of range (<1, 1000>).`;
  }

  if (isNumberOutOfRange(additionalPackagePrice, 1, 1000)) {
    errors[
      'additionalPackagePrice'
    ] = `[${additionalPackagePrice}] is out of range (<1, 1000>).`;
  }

  if (tariffs) {
    for (const [index, tariff] of tariffs.entries()) {
      validateTariff(tariff, index, errors);
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new BadRequestException(errors);
  }
}

function validateTariff(tariff: TariffDto, index: number, errors: object) {
  const { low, high, price } = tariff;

  if (isNumberOutOfRange(price, 1, 10000)) {
    errors[
      `tariff[${index}].price`
    ] = `[${price}] is out of range (<1, 10 000>).`;
  }

  if (
    isNumberOutOfRange(low, 1, 10000) ||
    isNumberOutOfRange(high, low + 1, 10000)
  ) {
    errors[
      `tariff[${index}].range`
    ] = `[${price}] is out of range (<1, 10 000>).`;
  }
}
