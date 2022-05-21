import asyncHandler from 'express-async-handler';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { ObjectId } from 'mongoose';

const indexRes = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});

const addRes = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        const message = errors.array().map((error) => error.msg);
        throw new Error(message.join('\n'));
    }

    const { name, lastName, email, password, dateOfBirth, gender } = req.body;

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
        name,
        lastName,
        email,
        password: hashedPassword,
        dateOfBirth,
        gender,
    };

    const user = await User.create(newUser);

    res.status(201).json({
        id: user.id,
        ...newUser,
        token: generateToken(user._id),
    });
});

const showRes = asyncHandler(async (req, res) => {});

const updateRes = asyncHandler(async (req, res) => {});

const deleteRes = asyncHandler(async (req, res) => {});

function generateToken(id: ObjectId): string {
    if (process.env.JWT_SECRET == null) {
        throw new Error('Could not sign');
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export { indexRes, addRes, showRes, updateRes, deleteRes };
