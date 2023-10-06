import { ApiProperty } from '@nestjs/swagger';

export class RegisterAdminRequest {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class LoginAdminRequest {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export interface LoginAdminResponse {
  accessToken: string;
}
