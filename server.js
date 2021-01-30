const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log('UNCAUGHT EXCEPTION !!! ');
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('DB connection is successful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on ${port}...`);
});

process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  // eslint-disable-next-line no-console
  console.log('UNHANDLED REJECTION !!! Shutting down....');
  server.close(() => {
    process.exit(1);
  });
});
