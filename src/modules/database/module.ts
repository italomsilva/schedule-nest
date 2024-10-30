
import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database';


@Global()
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}