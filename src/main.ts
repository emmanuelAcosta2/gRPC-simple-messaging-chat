import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {join} from 'path';
import {Logger} from "@nestjs/common";
import {MessagingModule} from "./messaging/messaging.module";
import { MESSAGING_PACKAGE_NAME } from '../proto/messaging';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      MessagingModule,
      {
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, '../messaging.proto'),
          package: MESSAGING_PACKAGE_NAME,
          url: '0.0.0.0:2024' 
        },
      },
  );

  await app.listen();

}
bootstrap().then(() => {
  const logger = new Logger('Main Logger');
  logger.log('gRPC server is listening on port 2024');
});
