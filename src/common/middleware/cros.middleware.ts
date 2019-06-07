import { Request, Response } from 'express';

export function CrosMiddleware(req: Request, res: Response, next: () => void) {
    // res.header('Access-Control-Allow-Origin', req.headers.origin + '');
    // res.header('Access-Control-Allow-Headers', `Origin, No-Cache, X-Requested-With,
    // If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With`);
    // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
}
