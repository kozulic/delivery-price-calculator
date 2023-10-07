import { ApiProperty } from '@nestjs/swagger';

export class BaseAdminRequest {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
export class RegisterAdminRequest extends BaseAdminRequest {}

export class LoginAdminRequest extends BaseAdminRequest {}

export interface LoginAdminResponse {
  accessToken: string;
}
