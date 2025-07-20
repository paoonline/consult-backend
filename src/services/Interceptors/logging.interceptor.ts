/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { AppLogger } from '../Logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const method = req.method;
    const url = req.originalUrl || req.url;
    const params = req.params;
    const query = req.query;
    const body = req.body;

    this.logger.log(
      `➡️  [${method}] ${url}\n` +
        `Params: ${this.safeJson(params)}\n` +
        `Query: ${this.safeJson(query)}\n` +
        `Body: ${this.safeJson(body)}`,
    );

    return next.handle().pipe(
      tap(() => {
        const statusCode = res.statusCode;
        this.logger.log(
          `✅ [${method}] ${url} - ${statusCode} - ${Date.now() - now}ms`,
        );
      }),

      catchError((err) => {
        const statusCode =
          err instanceof HttpException
            ? err.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
          err instanceof HttpException ? err.getResponse() : err.message;

        const trace = err.stack || '';

        this.logger.error(
          `❌ [${method}] ${url} - ${statusCode} - ${Date.now() - now}ms`,
          trace,
        );
        this.logger.error('Error Message:', this.safeJson(message));

        return throwError(() => err);
      }),
    );
  }

  private safeJson(data: any): string {
    const seen = new WeakSet();
    const SENSITIVE_KEYS = [
      'password',
      'pass',
      'token',
      'secret',
      'authorization',
    ];
    try {
      return JSON.stringify(
        data,
        function (_key, value) {
          if (SENSITIVE_KEYS.includes(_key.toLowerCase())) {
            return '[***]'; // 🔒 masked
          }
          if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) return '[Circular]';
            seen.add(value);
          }
          return value;
        },
        2,
      );
    } catch {
      return '[Cannot stringify]';
    }
  }
}
