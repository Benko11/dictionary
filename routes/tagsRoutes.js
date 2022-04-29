const express = require('express');
const { body, validationResult } = require('express-validator');
const Tag = require('../models/TagSchema');
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
    await tag.save();
    res.sendStatus(201);
});

module.exports = router;
