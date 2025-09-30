import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import apiRouter from './routes/api.js';
import errorHandler from './utils/errorHandler.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_ATLAS_URI)
.then (() => console.log('MongoDB Connected.'))
.catch (err => console.error('MongoDB connection error:', err));

//Routes
app.use('/api', apiRouter)

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log('Server is listening on port ' + PORT);
});

