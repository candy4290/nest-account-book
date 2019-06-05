import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '../enums/api-error-code.enum';

export class ApiException extends HttpException {
  private rtnCode: ApiErrorCode;
  private rtnMsg: string;
  constructor(rtnMsg: string, rtnCode: ApiErrorCode, statusCode: HttpStatus) {
    super(rtnMsg, statusCode);
    this.rtnMsg = rtnMsg;
    this.rtnCode = rtnCode;
  }
  getRtnCode(): ApiErrorCode {
    return this.rtnCode;
  }
  getRtnMsg(): string {
    return this.rtnMsg;
  }
}
