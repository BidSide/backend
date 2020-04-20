import { IsNumber } from 'class-validator';

export class BidDto {

  @IsNumber()
  amount: number;

}
