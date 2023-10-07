import { Calculator } from 'src/admin/models/calculator';
import { Tariff } from 'src/admin/models/tariff';
import { DeliveryRequest } from 'src/user/models/delivery-request';

export function calculatePrice(
  calculator: Calculator,
  deliveryRequest: DeliveryRequest,
): number {
  const { basePrice, additionalPackagePrice, tariffs } = calculator;
  const { distance, numberOfPackages, date } = deliveryRequest;

  let deliveryPrice = basePrice;
  deliveryPrice += getDistanceFee(tariffs, distance);

  // Calculate price for additional packages
  deliveryPrice += (numberOfPackages - 1) * additionalPackagePrice;

  // Increase total price (10%) on weekend
  if (!(new Date(date).getDay() % 6)) {
    deliveryPrice += deliveryPrice * 0.1;
  }

  return deliveryPrice;
}

function getDistanceFee(tariffs: Tariff[], distance: number): number {
  const tariff = tariffs?.find((t) => distance >= t.low && distance <= t.high);

  // There is no fee for this distance
  if (!tariff) {
    return 0;
  }

  return tariff.price;
}

export function buildConfirmationMessage(
  deliveryRequest: DeliveryRequest,
): string {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    date,
    numberOfPackages,
    price,
  } = deliveryRequest;
  return `
    Hello, ${firstName} ${lastName}.
    Your ${numberOfPackages} package(s) will be delivered on ${new Date(
      date,
    ).toDateString()}.
    You will be charged ${price} MONEY.
    You will be contacted on email ${email} or tel. ${phoneNumber} with additional details.`;
}
