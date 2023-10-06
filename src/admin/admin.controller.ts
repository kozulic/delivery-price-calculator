import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import {
  LoginAdminRequest,
  LoginAdminResponse,
  RegisterAdminRequest,
} from './models/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiTags('Admin')
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() request: RegisterAdminRequest): Promise<void> {
    await this.adminService.register(request);
  }

  @ApiTags('Admin')
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() request: LoginAdminRequest): Promise<LoginAdminResponse> {
    return this.adminService.login(request);
  }
}
