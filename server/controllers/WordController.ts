import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import Word from '../models/Word';

const indexRes = asyncHandler(async (req, res: any) => {
    const words = await Word.find({
        authors: { $in: [res.authorizedUser.id] },
    });
    res.json(words);
});

const showRes = asyncHandler(async (req, res: any) => {
    if (!res.filteredWord.authors.includes(res.authorizedUser.id))
        return res.sendStatus(404);

    res.json(res.filteredWord);
});

const addRes = asyncHandler(async (req, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sentences = req.body.sentences
        .split('\n')
        .map((sentence: any) => sentence.trim())
        .filter((sentence: any) => sentence !== '');

    const word = new Word({
        name: req.body.name,
        meanings: [{ meaning: req.body.meaning, sentences }],
        authors: [res.authorizedUser.id],
    });

    const saved = await word.save();
    res.status(201).json(saved);
});

const updateRes = asyncHandler(async (req, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sentences = req.body.sentences
        .split('\n')
        .map((sentence: any) => sentence.trim())
        .filter((sentence: any) => sentence !== '');

    const result = await Word.findByIdAndUpdate({
        title: req.body.title,
    });
    res.json(result);
});

const deleteRes = asyncHandler(async (req, res: any) => {
    const deleted = res.filteredWord;
    await Word.deleteOne({ _id: res.filteredWord._id });
    res.status(204).json(deleted);
});

export { indexRes, showRes, addRes, updateRes, deleteRes };
