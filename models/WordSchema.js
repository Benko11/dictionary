const { default: mongoose } = require('mongoose');
const Tag = require('./TagSchema');

const wordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    meanings: [
        { meaning: { type: String, required: true }, sentences: [String] },
    ],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Word = new mongoose.model('Word', wordSchema);
module.exports = Word;
