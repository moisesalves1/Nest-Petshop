import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { StoreModule } from 'src/modules/store/store.module';

@Module({
  imports: [
    MongooseModule.forRoot('CONNECTION_STRING', { dbName: 'petshop'}),
    BackofficeModule,
    StoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
