import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { queueNames } from './dto/gateway-sync';

@Module({
  controllers: [AppController],
})
export class AppModule {}
