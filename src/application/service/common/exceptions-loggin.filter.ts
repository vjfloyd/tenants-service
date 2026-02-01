import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger,} from '@nestjs/common';
import {Request, Response} from 'express';

@Catch()
      export class AllExceptionsLoggingFilter implements ExceptionFilter {
          private readonly logger = new Logger(AllExceptionsLoggingFilter.name);

          catch(exception: any, host: ArgumentsHost) {
              const ctx = host.switchToHttp();
              const response = ctx.getResponse<Response>();
              const request = ctx.getRequest<Request>();

              const status =
                  exception instanceof HttpException
                      ? exception.getStatus()
                      : HttpStatus.INTERNAL_SERVER_ERROR;

              // Log the full, raw exception object with database-specific fields
              const payload = {
                  name: exception?.name,
                  message: exception?.message,
                  code: exception?.code, // e.g., Postgres: '23505'
                  constraint: exception?.constraint, // e.g., 'users_email_key'
                  detail: exception?.detail,
                  table: exception?.table,
                  // Add other driver-specific fields if necessary
                  stack: exception?.stack,
              };

              this.logger.error(
                  `[${request.method}] ${request.url} - Status: ${status} - Exception:`,
                  safeStringify(payload),
              );

              // Prevent sending multiple responses
              if (response.headersSent) {
                  return;
              }

              // Send a generic error response to the client
              response.status(status).json({
                  statusCode: status,
                  message: 'Internal server error',
                  timestamp: new Date().toISOString(),
                  path: request.url,
              });
          }
      }

      function safeStringify(value: unknown) {
          const seen = new WeakSet<object>();
          return JSON.stringify(
              value,
              (key, val) => {
                  if (typeof val === 'object' && val !== null) {
                      if (seen.has(val)) return '[Circular]';
                      seen.add(val);
                  }
                  return val;
              },
              2,
          );
      }