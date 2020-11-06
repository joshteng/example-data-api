import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ExchangeRatesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
