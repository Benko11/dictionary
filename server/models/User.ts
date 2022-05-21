import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        gender: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Gender',
                required: true,
            },
        ],
        dateOfBirth: { type: Date, required: true },
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema);
