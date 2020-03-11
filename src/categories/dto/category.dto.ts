import { IsOptional, IsString } from 'class-validator';

export class CategoryDto {

  @IsString()
  readonly name: string;

  @IsString()
  readonly icon: string;

  @IsString()
  @IsOptional()
  readonly parentCategory: string;

  @IsString()
  @IsOptional()
  readonly childCategories: string;

}
