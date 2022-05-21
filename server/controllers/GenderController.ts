import asyncHandler from 'express-async-handler';
import Gender from '../models/Gender';
import { validationResult } from 'express-validator';

const indexRes = asyncHandler(async (req, res) => {
    const genders = await Gender.find();
    res.json(genders);
});

const showRes = asyncHandler(async (req, res: any) => {
    res.json(res.filteredGender);
});

const addRes = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        const message = errors.array().map((error) => error.msg);
        throw new Error(message.join('\n'));
    }

    const { name, pronoun } = req.body;
    const gender = await Gender.create({ name, pronoun });
    res.status(201).json(gender);
});

const deleteRes = asyncHandler(async (req, res: any) => {
    await Gender.findByIdAndDelete(res.filteredGender._id);
    res.status(204).json(res.filteredGender);
});

export { indexRes, showRes, addRes, deleteRes };
