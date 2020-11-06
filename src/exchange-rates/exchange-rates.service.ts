import { Injectable } from '@nestjs/common';
import { GetExchangeRateDto } from './dto/get-exchange-rate.dto';
import { ExchangeRate } from './entities/exchange-rate.entity';

@Injectable()
export class ExchangeRatesService {
  private exchangeRates: ExchangeRate[] = [
    {
      baseCurrency: 'MYR',
      quoteCurrency: 'USD',
      rate: 4.138,
      updatedAt: new Date(),
    }
  ]

  findOne(exchangeRateQuery: GetExchangeRateDto) {
    return this.exchangeRates.find(er => (
      er['baseCurrency'] == exchangeRateQuery['baseCurrency'] &&
      er['quoteCurrency'] == exchangeRateQuery['quoteCurrency']
    ))
  }
}
