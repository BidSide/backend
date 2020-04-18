import { IsNumber, IsString } from 'class-validator';

export class ProductDto {

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  buyoutPrice: number;

  @IsNumber()
  starterPrice: number;

  @IsString()
  category: string;
}
