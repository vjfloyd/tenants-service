import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor,} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const {method, url, body} = request;
        const now = Date.now();

        this.logger.log(`Incoming Request: [${method}] ${url} - Body: ${JSON.stringify(body)}`);

        return next.handle().pipe(
            tap({
                next: (data: any) => {
                    const response = context.switchToHttp().getResponse();
                    const statusCode = response.statusCode;
                    const delay = Date.now() - now;
                    this.logger.log(
                        `[${method}] ${url} - Status: ${statusCode} - Delay: ${delay}ms`,
                    );
                    this.logger.debug(`Response data: ${JSON.stringify(data)}`);
                },
                error: (error: any) => {
                    const delay = Date.now() - now;
                    const statusCode = error.status || 500;
                    this.logger.error(
                        `[${method}] ${url} - Status: ${statusCode} - Delay: ${delay}ms - Error: ${error.message}`,
                        error.stack,
                    );
                },
            }),
        );
    }
}
