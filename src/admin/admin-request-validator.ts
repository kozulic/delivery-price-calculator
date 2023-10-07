import { BadRequestException } from '@nestjs/common';
import { BaseAdminRequest } from './models/admin.dto';
import { isEmailValid, isStringOutOfRange } from '../shared/validation-utils';

export function validateAdminRequest(request: BaseAdminRequest) {
  const { email, password } = request;
  const errors = {};

  if (!isEmailValid(email)) {
    errors['email'] = `[${email}] has incorrect format.`;
  }

  if (isStringOutOfRange(password, 4, 30)) {
    errors['password'] = 'Password length should be between 4 and 30.';
  }

  if (Object.keys(errors).length > 0) {
    throw new BadRequestException(errors);
  }
}
