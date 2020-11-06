import { IsString } from "class-validator";
import { Transform } from "class-transformer";

export class GetExchangeRateDto {
  @IsString()
  @Transform((baseCurrency) => baseCurrency.toUpperCase())
  readonly "base-currency": string;

  @IsString()
  @Transform((quoteCurrency) => quoteCurrency.toUpperCase())
  readonly "quote-currency": string;
}
