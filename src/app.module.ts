import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot('CONNECTION_STRING', { dbName: 'petshop'}),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
