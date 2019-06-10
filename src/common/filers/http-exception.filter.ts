import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiException } from '../exceptions/api.exception';
@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
      if (exception instanceof ApiException) {
        response.status(status).json({
          rtnCode: exception.getRtnCode(),
          rtnMsg: exception.getRtnMsg(),
        });
      } else {
        response.status(status).json({
          rtnCode: status,
          rtnMsg: request.url,
        });
      }
  }
}
