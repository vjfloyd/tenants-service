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

  // Enable CORS
  const frontendUrlString = process.env.FRONTEND_URL || 'http://localhost:3000';
  const allowedOrigins = frontendUrlString.split(',').map(url => url.trim());
  console.log('Allowed Origins set to: ', allowedOrigins);
  console.log('### ', process.env.GOOGLE_CALLBACK_URL)
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked for origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, Cookie',
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

  await app.listen(process.env.PORT ?? 4001);
  console.log('App is listening on port: ', process.env.PORT ?? 4001);
}
bootstrap();
