import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { StoreModule } from 'src/modules/store/store.module';
import { Product } from './modules/store/entities/product.entity';
import { OrderItem } from './modules/store/entities/order-item.entity';
import { Order } from './modules/store/entities/order.entity';
import { AgendaModule } from './modules/agenda/agenda.module';
require('dotenv/config');

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONN, { dbName: 'petshop'}),
    TypeOrmModule.forRoot({ 
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'petshop',
      password: 'Petshop@123',
      database: 'petshop',
      synchronize: true,
      entities: [Product, Order, OrderItem]
    }),
    BackofficeModule,
    StoreModule,
    AgendaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
