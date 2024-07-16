import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { PaginationDto } from '../common';
import { NATS_SERVICE } from '../config';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  findProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  patchOne(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client
      .send({ cmd: 'update_product' }, { id: +id, ...updateProductDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
