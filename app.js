const express = require('express');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const jobRouter = require('./routes/jobRoutes');
const viewRouter = require('./routes/viewRoutes');
const globalErrorHandler = require('./controller/errorController');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(compression());

app.use(express.static(path.join(__dirname, `public`)));
app.use(express.static(path.join(__dirname, `dist`)));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/', viewRouter);

app.use(globalErrorHandler);

module.exports = app;
