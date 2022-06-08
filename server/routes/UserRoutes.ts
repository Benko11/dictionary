import express from 'express';
import { body, check, CustomValidator } from 'express-validator';
import { indexRes, addRes, authenticate } from '../controllers/UserController';
import User from '../models/User';

const router = express.Router();

router.get('/', indexRes);

const emailExists: CustomValidator = async (value) => {
    const user = await User.findOne({ email: value });
    if (user != null) return Promise.reject('Email address already registered');
};

const passwordsMatch: CustomValidator = async (password, { req }) => {
    if (password !== req.body.password) {
        return Promise.reject('Passwords do not match');
    }
    return Promise.resolve();
};

router.post(
    '/register',
    body('name').trim().not().isEmpty().escape(),
    body('lastName').trim().not().isEmpty().escape(),
    body('email').trim().isEmail().custom(emailExists),
    body('gender').not().isEmpty(),
    body('dateOfBirth').not().isEmpty().isDate().withMessage('invalid date'),
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    check('passwordConfirmation').isLength({ min: 8 }).custom(passwordsMatch),
    addRes
);

router.post(
    '/login',
    body('email').isEmail(),
    body('password').not().isEmpty(),
    authenticate
);

export default router;
