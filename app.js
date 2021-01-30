const express = require('express');
const path = require('path');
const compression = require('compression');

const userRouter = require('./routes/userRoutes');
const jobRouter = require('./routes/jobRoutes');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, `public`)));
app.use(express.static(path.join(__dirname, `dist`)));

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);

app.use(globalErrorHandler);

module.exports = app;
