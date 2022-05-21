import asyncHandler from 'express-async-handler';
import Tag from '../models/Tag';

const indexRes = asyncHandler(async (req, res) => {
    const tags = await Tag.find();
    res.json(tags);
});

const addRes = asyncHandler(async (req, res) => {
    if (!req.body.title) return;

    const tag = new Tag({
        title: req.body.title,
    });

    const saved = await tag.save();
    res.status(201).json(saved);
});

const showRes = asyncHandler(async (req, res: any) => {
    res.json(res.filteredTag);
});

const updateRes = asyncHandler(async (req, res: any) => {
    if (req.body.title == null) res.status(400);

    const result = await Tag.findByIdAndUpdate(
        res.filteredTag._id,
        {
            title: req.body.title,
        },
        { new: true }
    );

    res.json(result);
});

const deleteRes = asyncHandler(async (req, res: any) => {
    const deleted = res.filteredTag;
    await Tag.deleteOne({ _id: res.filteredTag._id });
    res.status(204).json(deleted);
});

export { indexRes, addRes, showRes, updateRes, deleteRes };
