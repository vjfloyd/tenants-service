import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {DomainErrorFilter} from './application/service/common/domain.error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  app.useGlobalFilters(new DomainErrorFilter());
  await app.listen(process.env.PORT ?? 4001);
  console.log('App listening on port : ', process.env.PORT ?? 4000);
}
bootstrap();
