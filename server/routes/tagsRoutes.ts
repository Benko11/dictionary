import express, { NextFunction, Request } from 'express';
import { body, validationResult } from 'express-validator';
import Tag from '../models/TagSchema';

const router = express.Router();

router.get('/', async (req, res) => {
    const tags = await Tag.find();
    res.json(tags);
});

router.post('/', body('title').not().isEmpty(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const tag = new Tag({
        title: req.body.title,
    });

    const saved = await tag.save();
    res.status(201).json(saved);
});

router.get('/:id', getTagById, async (req, res: any) => {
    res.json(res.filteredTag);
});

router.delete('/:id', getTagById, async (req, res: any) => {
    try {
        const deleted = res.filteredTag;
        await Tag.deleteOne({ _id: res.filteredTag._id });
        res.status(204).json(deleted);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

async function getTagById(req: Request, res: any, next: NextFunction) {
    const id = req.params.id;
    try {
        const tag = await Tag.findById(id);
        if (tag == null) {
            res.sendStatus(404);
            return;
        }

        res.filteredTag = tag;
        next();
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
}

export default router;
