import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {DomainErrorFilter} from './application/service/common/domain.error.filter';
import * as session from 'express-session';
import * as passport from 'passport';
import {collectDefaultMetrics, register} from 'prom-client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // Prometheus monitoring
  collectDefaultMetrics();
  app.getHttpAdapter().get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });

  app.use(
      session({
        secret: process.env.SESSION_SECRET || 'my-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 3600000, // 1 hour
        },
      }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  app.useGlobalFilters(new DomainErrorFilter());

  // Enable CORS
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  app.enableCors({
    origin: frontendUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4001);
  console.log('App is listening on port: ', process.env.PORT ?? 4001);
}
bootstrap();
