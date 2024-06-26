import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { config, ORDERS_SERVICE } from '../config';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: config.ordersMicroservice.host,
          port: config.ordersMicroservice.port,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
