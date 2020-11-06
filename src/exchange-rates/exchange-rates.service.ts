import { HttpService, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { GetExchangeRateDto } from './dto/get-exchange-rate.dto';
import { ExchangeRate } from './entities/exchange-rate.entity';

@Injectable()
export class ExchangeRatesService {
  constructor(private httpService: HttpService) {
    this.getExchangeRate()
  }

  private readonly logger = new Logger(ExchangeRatesService.name)

  private exchangeRates: ExchangeRate[] = [
    {
      baseCurrency: 'MYR',
      quoteCurrency: 'USD',
      rate: 0,
      updatedAt: new Date(),
    }
  ]

  findOne(exchangeRateQuery: GetExchangeRateDto) {
    this.logger.debug("Finding exchange rate.....")

    return this.exchangeRates.find(er => (
      er['base-currency'] == exchangeRateQuery['baseCurrency'] &&
      er['quote-currency'] == exchangeRateQuery['quoteCurrency']
    ))
  }

  @Cron(CronExpression.EVERY_3_HOURS)
  async getExchangeRate() {
    this.logger.debug("Updating exchange rate.....")

    const baseCurrency = 'MYR'
    const quoteCurrency = 'USD'

    const url = `https://currency13.p.rapidapi.com/convert/10/${quoteCurrency}/${baseCurrency}`

    const headers = {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'currency13.p.rapidapi.com'
    }

    const res = await this.httpService.get(url,
      {
        headers: headers
      }).toPromise()

    this.updateExchangeRate(baseCurrency, quoteCurrency, +res.data['amount'])
  }

  private updateExchangeRate(baseCurrency: string, quoteCurrency: string, rate: number) {
    const exchangeRate: ExchangeRate = new ExchangeRate()
    exchangeRate.baseCurrency = baseCurrency
    exchangeRate.quoteCurrency = quoteCurrency
    exchangeRate.rate = rate
    exchangeRate.updatedAt = new Date()

    const i = this.exchangeRates.findIndex(er => (
      er['baseCurrency'] == baseCurrency &&
      er['quoteCurrency'] == quoteCurrency
    ))

    this.exchangeRates[i] = exchangeRate
  }
}
