import express, { NextFunction, Request } from 'express';
import { body, validationResult } from 'express-validator';
import {
    addRes,
    deleteRes,
    indexRes,
    showRes,
    updateRes,
} from '../controllers/TagController';
import Tag from '../models/Tag';

const router = express.Router();

router.get('/', indexRes);
router.post('/', addRes);
router.get('/:id', getTagById, showRes);
router.put('/:id', getTagById, updateRes);
router.delete('/:id', getTagById, deleteRes);

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
