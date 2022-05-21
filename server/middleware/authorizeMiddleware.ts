import { NextFunction, request, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import JWTUserToken from '../interfaces/JWTUserToken';
import chalk from 'chalk';
import User from '../models/User';

const authorizeMiddleware = asyncHandler(async (req, res: any, next) => {
    if (req.headers && process.env.JWT_SECRET != null) {
        if (
            req.headers.authorization == null ||
            !req.headers.authorization.startsWith('Bearer')
        ) {
            res.status(401);
            throw new Error('Unauthorized access');
        }

        try {
            const requestToken = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                requestToken,
                process.env.JWT_SECRET
            ) as JWTUserToken;

            const authorizedUser = await User.findById(decoded.id).select(
                '-password'
            );

            if (authorizedUser == null) {
                res.status(401);
                throw new Error('Unauthorized access');
            }

            res.authorizedUser = authorizedUser;
            return next();
        } catch (err) {
            console.log(chalk.red(err));
            res.status(401);
            throw new Error('Unauthorized access');
        }
    }

    res.status(401);
    throw new Error('Unauthorized access');
});

export default authorizeMiddleware;
