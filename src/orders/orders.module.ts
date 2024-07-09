import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { OrdersController } from './orders.controller';
import { envs, ORDER_SERVICE } from '../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMsHost,
          port: envs.ordersMsPort,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
