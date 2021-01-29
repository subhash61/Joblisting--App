const express = require('express');
const userRouter = require('./routes/userRoutes');
const jobRouter = require('./routes/jobRoutes');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);

app.use(globalErrorHandler);

module.exports = app;
