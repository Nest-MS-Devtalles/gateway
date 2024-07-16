import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { catchError } from 'rxjs';
import { PaginationDto } from '../common';
import { NATS_SERVICE } from '../config';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({ cmd: 'create_order' }, createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.client
      .send({ cmd: 'find_all_orders' }, orderPaginationDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send({ cmd: 'find_one_order' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get('status/:status')
  findByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.client
      .send(
        { cmd: 'find_all_orders' },
        { ...paginationDto, status: statusDto.status },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    return this.client
      .send({ cmd: 'change_order_status' }, { id, status: statusDto.status })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
