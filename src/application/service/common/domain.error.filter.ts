import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus,} from '@nestjs/common';
import {Request, Response} from 'express';
import {DomainError, ValidationError} from './domain.error';


@Catch()
export class DomainErrorFilter implements ExceptionFilter {
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



    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'InternalServerError',
      message: 'Internal server error',
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}