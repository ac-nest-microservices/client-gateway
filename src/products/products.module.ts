import { Module } from '@nestjs/common';

import { NatsModule } from '../transports/nats.module';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  imports: [NatsModule],
})
export class ProductsModule {}
