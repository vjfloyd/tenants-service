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

  // Enable CORS
  app.enableCors({
    origin: '*', // or specify allowed origins like 'http://localhost:3000'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4001);
  console.log('App hi listening on port : ', process.env.PORT ?? 4000);
}
bootstrap();
