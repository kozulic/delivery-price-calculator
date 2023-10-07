import { Calculator } from '../admin/models/calculator';
import { Tariff } from '../admin/models/tariff';
import { DeliveryRequest } from '../user/models/delivery-request';
import { calculatePrice } from './calculation-utils';

describe('calculationUtils', () => {
  describe('calculatePrice', () => {
    it('should return 25.3', () => {
      const calculator = new Calculator();
      calculator.basePrice = 10;
      calculator.additionalPackagePrice = 2;
      calculator.tariffs = [
        <Tariff>{ low: 50, high: 100, price: 5 },
        <Tariff>{ low: 101, high: 200, price: 11 },
      ];

      const deliveryRequest = new DeliveryRequest();
      deliveryRequest.distance = 65;
      deliveryRequest.numberOfPackages = 5;
      // Saturday (weekend)
      deliveryRequest.date = new Date('2023-10-07T03:24:00');

      expect(calculatePrice(calculator, deliveryRequest)).toBe(25.3);
    });

    it('should return 11.5', () => {
      const calculator = new Calculator();
      calculator.basePrice = 1.5;
      calculator.additionalPackagePrice = 2.5;
      calculator.tariffs = [];

      const deliveryRequest = new DeliveryRequest();
      deliveryRequest.distance = 65;
      deliveryRequest.numberOfPackages = 5;
      // Wednesday
      deliveryRequest.date = new Date('2023-10-04T03:24:00');

      expect(calculatePrice(calculator, deliveryRequest)).toBe(11.5);
    });
  });
});
