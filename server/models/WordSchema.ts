import { default as mongoose } from 'mongoose';
import Tag from './TagSchema';

const wordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    meanings: [
        { meaning: { type: String, required: true }, sentences: [String] },
    ],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Word', wordSchema);
