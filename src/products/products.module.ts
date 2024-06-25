import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { config, PRODUCTS_SERVICE } from '../config';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: config.productsMicroservice.host,
          port: config.productsMicroservice.port,
        },
      },
    ]),
  ],
})
export class ProductsModule {}
