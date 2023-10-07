import { DeliveryRequest } from './models/delivery-request';
import { CreateDeliveryRequest } from './models/delivery-request.dto';

export function mapDeliveryRequest(
  request: CreateDeliveryRequest,
): DeliveryRequest {
  const deliveryRequest = new DeliveryRequest();

  deliveryRequest.distance = request.distance;
  deliveryRequest.date = request.date;
  deliveryRequest.numberOfPackages = request.numberOfPackages;
  deliveryRequest.firstName = request.firstName;
  deliveryRequest.lastName = request.lastName;
  deliveryRequest.email = request.email;
  deliveryRequest.phoneNumber = request.phoneNumber;

  return deliveryRequest;
}
