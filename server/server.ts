import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import wordsRoutes from './routes/wordsRoutes';
import tagsRoutes from './routes/tagsRoutes';

const app = express();
require('dotenv').config();

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use('/words', wordsRoutes);
app.use('/tags', tagsRoutes);

app.listen(process.env.PORT, () => console.log('the server is running...'));

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB_STRING || '');
    } catch (err) {
        console.error(err);
        return;
    }
}
