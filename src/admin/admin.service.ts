import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

import { Admin } from './models/admin';
import {
  LoginAdminRequest,
  LoginAdminResponse,
  RegisterAdminRequest,
} from './models/admin.dto';
import { JwtService } from '@nestjs/jwt';
import { validateAdminRequest } from './admin-request-validator';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async register(request: RegisterAdminRequest): Promise<void> {
    validateAdminRequest(request);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(request.password, salt);

    const admin = await this.adminRepository.findOne({
      where: { email: request.email },
    });

    if (admin) {
      throw new BadRequestException(
        `Admin with email: [${request.email}] already exists.`,
      );
    }

    const newAdmin = this.adminRepository.create({
      email: request.email,
      password: hashedPassword,
    });

    await this.adminRepository.save(newAdmin);
  }

  async login(request: LoginAdminRequest): Promise<LoginAdminResponse> {
    validateAdminRequest(request);

    const admin = await this.adminRepository.findOne({
      where: { email: request.email },
    });

    if (!admin) {
      throw new NotFoundException(
        `Admin with email: [${request.email}] doesn't exist.`,
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      request.password,
      admin.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException(
        'Email and password combination does not match.',
      );
    }

    const payload = { adminId: admin.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken: accessToken,
    };
  }
}
