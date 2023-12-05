import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { StoreModule } from 'src/modules/store/store.module';
import { Product } from './modules/store/entities/product.entity';
import { OrderItem } from './modules/store/entities/order-item.entity';
import { Order } from './modules/store/entities/order.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://petshop:petshop@petshop.petshop.mongodb.net/?retryWrites=true&w=majority', { dbName: 'petshop'}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'petshop',
      password: 'Petshop@123',
      database: 'petshop',
      // entities: [__dirname + '/**/*.entity{.ts.js}' ],
      synchronize: true,
      entities: [Product, Order, OrderItem]
    }),
    BackofficeModule,
    StoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
