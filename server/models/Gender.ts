import mongoose from 'mongoose';

const genderSchema = new mongoose.Schema({
    name: { required: true, type: String, unique: true },
    pronoun: {
        required: true,
        type: String,
        enum: ['he', 'she', 'they'],
    },
});

export default mongoose.model('Gender', genderSchema);
