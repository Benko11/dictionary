import express, { NextFunction, Request } from 'express';
import Word from '../models/Word';
import { body, validationResult } from 'express-validator';
import {
    addRes,
    deleteRes,
    indexRes,
    showRes,
    updateRes,
} from '../controllers/WordController';
import authorizeMiddleware from '../middleware/authorizeMiddleware';

const router = express.Router();

router.get('/', authorizeMiddleware, indexRes);

router.post(
    '/',
    body('name').not().isEmpty().trim().escape(),
    body('meaning').not().isEmpty().trim(),
    body('sentences').trim(),
    addRes
);

router.get('/:id', authorizeMiddleware, getWordById, showRes);
router.put('/:id', getWordById, updateRes);
router.delete('/:id', getWordById, deleteRes);

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
