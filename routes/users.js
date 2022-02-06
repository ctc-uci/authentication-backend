// Routes relating to accounts here
const express = require('express');

const userRouter = express();
const pool = require('../config');

userRouter.use(express.json());

const isAlphaNumeric = (value) => {
  if (!/^[0-9a-zA-Z]+$/.test(value)) {
    throw new Error('User ID must be alphanumeric');
  }
};

// Get all users
userRouter.get('/', async (req, res) => {
  try {
    const user = await pool.query(`SELECT * FROM users`);
    res.send({
      account: user.rows,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get a specific user by ID
userRouter.get('/:userId', async (req, res) => {
  try {
    const {userId} = req.params;
    isAlphaNumeric(userId); // ID must be alphanumeric

    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    res.send({
      user: user.rows[0],
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Add user to database
userRouter.post('/create', async (req, res) => {
  try {
    const {email, userId, role} = req.body;
    isAlphaNumeric(userId); // ID must be alphanumeric

    const newUser = await pool.query(
      'INSERT INTO users (email, user_id, role) VALUES ($1, $2, $3) RETURNING *',
      [email, userId, role],
    );

    res.status(200).send({
      newUser: newUser.rows[0],
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = userRouter;
