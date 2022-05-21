import { NextFunction, Request, Response } from 'express';

export default function ErrorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const status = res.statusCode ? res.statusCode : 500;
    res.status(status).json({
        name: err.name,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
}
