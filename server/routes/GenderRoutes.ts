import express, { NextFunction, Request } from 'express';
import { body, check } from 'express-validator';
import {
    addRes,
    indexRes,
    showRes,
    deleteRes,
} from '../controllers/GenderController';
import Gender from '../models/Gender';

const router = express.Router();
router.get('/', indexRes);
router.post(
    '/',
    body('name').not().isEmpty(),
    check('pronoun').not().isEmpty().isIn(['he', 'she', 'they']),
    addRes
);
router.get('/:id', getGenderById, showRes);
router.delete('/:id', getGenderById, deleteRes);

async function getGenderById(req: Request, res: any, next: NextFunction) {
    try {
        const gender = await Gender.findById(req.params.id);
        if (gender == null) {
            res.status(404);
            throw new Error('Not Found');
        }

        res.filteredGender = gender;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
}

export default router;
