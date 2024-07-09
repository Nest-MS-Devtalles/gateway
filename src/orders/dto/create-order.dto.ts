import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  status: string;
}
