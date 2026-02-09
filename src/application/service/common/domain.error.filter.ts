import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import {Request, Response} from 'express';
import {DomainError, ValidationError} from './domain.error';


@Catch()
export class DomainErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainErrorFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (exception instanceof DomainError) {
      res.status(exception.status).json({
        statusCode: exception.status,
        error: exception.name,
        code: exception.code,
        message: exception.message,
        details: exception.details ?? null,
        path: req.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (exception instanceof ValidationError) {
      const status = HttpStatus.BAD_REQUEST;
      res.status(status).json({
        statusCode: status,
        error: exception.name,
        code: exception.code,
        message: exception.message,
        details: exception.details ?? null,
        path: req.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (exception instanceof BadRequestException) {
      const status = HttpStatus.BAD_REQUEST;
      const response = exception.getResponse();
      const message = (response as any).message || exception.message;

      res.status(status).json({
        statusCode: status,
        error: 'BadRequest',
        message: message,
        path: req.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();

      // Helpful when debugging unexpected 4xx/5xx coming from Nest internals
      this.logger.warn(
          `[${req.method}] ${req.url} - HttpException ${status}: ${JSON.stringify(body)}`,
      );


      res.status(status).json(
        typeof body === 'string'
          ? {
              statusCode: status,
              error: exception.name,
              message: body,
              path: req.url,
              timestamp: new Date().toISOString(),
            }
          : {
              statusCode: status,
              ...(body as object),
              path: req.url,
              timestamp: new Date().toISOString(),
            },
      );
      return;
    }

    // ✅ THIS is the missing piece: log the real error + stack
    const anyEx = exception as any;
    this.logger.error(
        `[${req.method}] ${req.url} - 500 Unhandled exception`,
        anyEx?.stack ?? JSON.stringify(anyEx),
    );

    // Optional: print the raw object too (sometimes drivers put useful fields on it)
    // console.error('RAW exception:', exception);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'InternalServerError',
      message: 'Internal server error',
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}