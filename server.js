const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const wordsRoutes = require('./routes/wordsRoutes');
const tagsRoutes = require('./routes/tagsRoutes');

connectToDatabase();

app.use(express.json());
app.use(express.static('public'));

app.use('/words', wordsRoutes);
app.use('/tags', tagsRoutes);

app.listen(process.env.PORT, () => console.log('the server is running...'));

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB_STRING);
    } catch (err) {
        console.error(err);
        return;
    }
}
