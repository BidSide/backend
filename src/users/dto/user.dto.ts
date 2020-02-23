import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsEmail(
    {},
    {
      message: 'Nem megfelelő email',
      context: { status: 422 },
    },
  )
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly passwordAgain: string;
}
