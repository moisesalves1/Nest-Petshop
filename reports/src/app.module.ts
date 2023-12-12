import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ReportsModule } from './reports/reports.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    // GraphQLModule.forRoot({
    //   driver: ApolloDriver,
    //   // debug: false,
    //   // playground: false,
    //   installSubscriptionHandlers: true,
    //   autoSchemaFile: 'schema.gql'
    // }),
    
    ReportsModule
  ]
})
export class AppModule {}
