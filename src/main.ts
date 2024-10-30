import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { NestFactory } from '@nestjs/core';
import { RootModule } from './RootModule';
import * as bodyParser from 'body-parser';
import { SwaggerConfig } from './modules/swagger/config';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);

  app.enableCors();
  
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  SwaggerConfig.setup(app);

  await app.listen(process.env.PORT);
}
bootstrap();
