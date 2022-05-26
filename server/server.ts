import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import wordsRoutes from './routes/WordRoutes';
import tagsRoutes from './routes/TagRoutes';
import userRoutes from './routes/UserRoutes';
import genderRoutes from './routes/GenderRoutes';
import ErrorMiddleware from './middleware/ErrorMiddleware';

require('dotenv').config();

const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/words', wordsRoutes);
app.use('/tags', tagsRoutes);
app.use('/users', userRoutes);
app.use('/genders', genderRoutes);

app.use(ErrorMiddleware);

app.listen(process.env.PORT, () => console.log('the server is running...'));

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB_STRING || '');
    } catch (err) {
        console.error(err);
        return;
    }
}
