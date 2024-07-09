import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ORDER_SERVICE } from '../config';
import { CreateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersService: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.send({ cmd: 'create_order' }, createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.send({ cmd: 'find_all_orders' }, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.send({ cmd: 'find_one_order' }, { id: +id });
  }
}
