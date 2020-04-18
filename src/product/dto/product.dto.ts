import { IsNumber, IsString } from 'class-validator';

export class ProductDto {

  @IsString()
  name: string;

  @IsNumber()
  buyout: number;

  @IsNumber()
  starterPrice: number;

  @IsString()
  category: string;
}
