import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryRequest {
  @ApiProperty()
  distance: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  numberOfPackages: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;
}
