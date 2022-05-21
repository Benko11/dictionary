import express, { NextFunction, Request } from 'express';
import Word from '../models/WordSchema';
import { body, validationResult } from 'express-validator';
const router = express.Router();

router.get('/', async (req, res) => {
    const results = await Word.find();
    res.json(results);
});

router.post(
    '/',
    body('name').not().isEmpty().trim().escape(),
    body('meaning').not().isEmpty().trim(),
    body('sentences').trim(),
    async (req, res) => {
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
        });

        const saved = await word.save();
        res.status(201).json(saved);
    }
);

router.get('/:id', getWordById, async (req, res: any) => {
    res.json(res.filteredWord);
});

router.delete('/:id', getWordById, async (req, res: any) => {
    try {
        const deleted = res.filteredWord;
        await Word.deleteOne({ _id: res.filteredWord._id });
        res.status(204).json(deleted);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

export default router;

async function getWordById(req: Request, res: any, next: NextFunction) {
    const id = req.params.id;
    try {
        let filtered = await Word.findById(id);
        if (filtered == null) {
            res.sendStatus(404);
            return;
        }

        res.filteredWord = filtered;
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
        return;
    }

    next();
}
