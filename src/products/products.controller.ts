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

import { PRODUCTS_SERVICE } from '../config';
import { PaginationDto } from '../common';
import { CreateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCTS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.client.send('createProduct', createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('findAllProducts', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findOneProduct', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

    // try {
    //   return await firstValueFrom(this.client.send('findOneProduct', { id }));
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.client.send('updateProduct', { id, ...updateProductDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeProduct', { id });
  }
}
