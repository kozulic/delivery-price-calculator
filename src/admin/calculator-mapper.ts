import { Calculator } from 'src/admin/models/calculator';
import { BaseCalculatorRequest } from './models/calculator.dto';
import { Tariff } from './models/tariff';

export function mapCalculatorRequest(
  request: BaseCalculatorRequest,
  existingCalculator?: Calculator,
): Calculator {
  const calculator = existingCalculator ?? new Calculator();
  calculator.basePrice = request.basePrice;
  calculator.additionalPackagePrice = request.additionalPackagePrice;
  calculator.tariffs = request.tariffs.map((t) => {
    return <Tariff>{
      low: t.low,
      high: t.high,
      price: t.price,
    };
  });

  return calculator;
}
