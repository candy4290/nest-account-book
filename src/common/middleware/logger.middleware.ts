import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';
export function logger(req: Request, res: Response, next: () => void) {
    Logger.log('中间件...');
    next();
}
