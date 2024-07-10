import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enums/order.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Status must be a valid value. Valid options are: ${OrderStatusList}`,
  })
  status?: OrderStatus;
}
