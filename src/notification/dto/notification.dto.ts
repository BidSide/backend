import { IsNotEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class NotificationDto {

  @IsNotEmpty()
  profile: any;

  @IsString()
  message: string;

  @Optional()
  seen: boolean;
}
