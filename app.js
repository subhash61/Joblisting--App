const express = require('express');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
// app.use('/api/v1/employer', emp);

app.use(globalErrorHandler);

module.exports = app;
