import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiException } from '../exceptions/api.exception';
import { ApiErrorCode } from '../enums/api-error-code.enum';
@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    Logger.log('过滤器...');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    try {
      const status = exception.getStatus();
      if (exception instanceof ApiException) {
        response.status(status).json({
          rtnCode: exception.getRtnCode(),
          rtnMsg: exception.getRtnMsg(),
        });
      } else {
        response.status(status).json({
          rtnCode: status,
          rtnMsg: exception.message.message,
        });
      }
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        rtnCode: ApiErrorCode.SYSTEM_UNKNOW_ERROR,
        rtnMsg: '系统未知错误！',
      });
    }
  }
}
