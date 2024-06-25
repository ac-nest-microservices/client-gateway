import {
  BadRequestException,
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
import { ClientProxy } from '@nestjs/microservices';

import { PRODUCTS_SERVICE } from '../config';
import { PaginationDto } from '../common/dto';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCTS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createProductDto: any) {
    return 'This action adds a new product';
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('findAllProducts', paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await firstValueFrom(this.client.send('findOneProduct', { id }));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: any) {
    return `This action updates a #${id} product`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} product`;
  }
}
