import { Request, Response } from 'express';
export function logger(req: Request, res: Response, next: () => void) {
    console.log('Request...' + req.url);
    next();
}
