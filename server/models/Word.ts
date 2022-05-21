import { default as mongoose } from 'mongoose';

const wordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    meanings: [
        { meaning: { type: String, required: true }, sentences: [String] },
    ],
    authors: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Word', wordSchema);
