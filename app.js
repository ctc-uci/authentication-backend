const express = require('express');
const cors = require('cors');

require('dotenv').config();

// Routes
const userRouter = require('./routes/users');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
  }),
);

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
