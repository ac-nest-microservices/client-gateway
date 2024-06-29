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
import { firstValueFrom } from 'rxjs';

import { NATS_SERVICE } from '../config';
import { PaginationDto } from '../common';
import { CreateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await firstValueFrom(
        this.client.send('createProduct', createProductDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    try {
      return await firstValueFrom(
        this.client.send('findAllProducts', paginationDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // return this.client.send('findOneProduct', { id }).pipe(
    //   catchError((err) => {
    //     throw new RpcException(err);
    //   }),
    // );

    try {
      return await firstValueFrom(this.client.send('findOneProduct', { id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: any) {
    try {
      return await firstValueFrom(
        this.client.send('updateProduct', { id, ...updateProductDto }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await firstValueFrom(this.client.send('removeProduct', { id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
