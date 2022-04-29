const express = require('express');
const Word = require('../models/WordSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    const results = await Word.find();
    res.json(results);
});

router.post(
    '/',
    body('name').not().isEmpty().trim().escape(),
    body('meaning').not().isEmpty().trim().escape(),
    body('sentences').trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const sentences = req.body.sentences
            .split('\n')
            .map((sentence) => sentence.trim())
            .filter((sentence) => sentence !== '');

        const word = new Word({
            name: req.body.name,
            meanings: [{ meaning: req.body.meaning, sentences }],
        });

        await word.save();
        res.sendStatus(201);
    }
);

router.get('/:id', getWordById, async (req, res) => {
    res.send(res.filteredWord);
});

router.delete('/:id', getWordById, async (req, res) => {
    try {
        await Word.deleteOne({ _id: res.filteredWord._id });
        res.status(204).send(res.filteredWord);
    } catch {
        res.sendStatus(404);
    }
});

module.exports = router;

async function getWordById(req, res, next) {
    const id = req.params.id;
    let filtered = await Word.findById(id);
    if (filtered == null) {
        res.sendStatus(404);
        return;
    }

    res.filteredWord = filtered;
    next();
}
