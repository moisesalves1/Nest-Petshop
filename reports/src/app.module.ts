import { Module } from '@nestjs/common';
import { ReportsModule } from './reports/reports.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      // debug: false,
      // playground: false,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql'
    }),
    ReportsModule
  ]
})
export class AppModule {}
