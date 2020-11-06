import { Controller, Get, Query } from '@nestjs/common';
import { GetExchangeRateDto } from './dto/get-exchange-rate.dto';
import { ExchangeRatesService } from './exchange-rates.service';

@Controller('exchange-rates')
export class ExchangeRatesController {
  constructor(private readonly exchangeRateService: ExchangeRatesService) { }

  @Get()
  findOne(@Query() exchangeRateQuery: GetExchangeRateDto) {
    const result: {} = this.exchangeRateService.findOne(exchangeRateQuery)
    return result
  }
}
