import { ApiProperty } from '@nestjs/swagger';

class TariffDto {
  @ApiProperty()
  low: number;

  @ApiProperty()
  high: number;

  @ApiProperty()
  price: number;
}

export class BaseCalculatorRequest {
  @ApiProperty()
  basePrice: number;

  @ApiProperty()
  additionalPackagePrice: number;

  @ApiProperty({
    isArray: true,
    type: TariffDto,
  })
  tariffs: TariffDto[];
}

export class CreateCalculatorRequest extends BaseCalculatorRequest {}

export class UpdateCalculatorRequest extends BaseCalculatorRequest {}
