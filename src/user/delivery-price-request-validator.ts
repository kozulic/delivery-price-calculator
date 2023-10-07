import { BadRequestException } from '@nestjs/common';
import { CreateDeliveryRequest } from './models/delivery-request.dto';
import {
  isEmailValid,
  isNumberOutOfRange,
  isStringOutOfRange,
} from '../shared/validation-utils';

export function validateDeliveryRequest(request: CreateDeliveryRequest) {
  const {
    distance,
    numberOfPackages,
    firstName,
    lastName,
    email,
    phoneNumber,
  } = request;

  const errors = {};

  // Google says 20,037.5 kilometers is the maximum distance betweeen any two points.
  if (isNumberOutOfRange(distance, 1, 20038)) {
    errors['distance'] = `[${distance}] is out of range (<1, 20038>).`;
  }

  // Let's limit to 1 000 000 packages.
  if (
    isNumberOutOfRange(numberOfPackages, 1, 1000000) ||
    !Number.isInteger(numberOfPackages)
  ) {
    errors[
      'numberOfPackages'
    ] = `[${numberOfPackages}] is out of range (<1, 1 000 000>).`;
  }

  if (isStringOutOfRange(firstName, 1, 30)) {
    errors[
      'firstName'
    ] = `[${firstName}] is out of range. First name length should be between 1 and 30.`;
  }

  if (isStringOutOfRange(lastName, 1, 30)) {
    errors[
      'lastName'
    ] = `[${lastName}] is out of range. Last name length should be between 1 and 30.`;
  }

  if (!isEmailValid(email)) {
    errors['email'] = `[${email}] has incorrect format.`;
  }

  //https://regexr.com/3c53v
  if (!phoneNumber.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)) {
    errors['phoneNumber'] = `[${phoneNumber}] has incorrect format.`;
  }

  if (Object.keys(errors).length > 0) {
    throw new BadRequestException(errors);
  }
}
