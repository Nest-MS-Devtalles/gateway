import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ORDER_SERVICE } from '../config';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          // host: envs.ordersMsHost,
          // port: envs.ordersMsPort,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
