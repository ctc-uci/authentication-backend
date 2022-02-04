// Routes relating to accounts here
const express = require('express');

const userRouter = express();
const pool = require('../config');

userRouter.use(express.json());

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

// Get a specific user by email
userRouter.get('/:email', async (req, res) => {
  const {email} = req.params;
  try {
    const user = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
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

    const newUser = await pool.query(`
    INSERT INTO users (email, user_id, role)
    VALUES ('${email}', '${userId}', '${role}')
    RETURNING *
  `);

    res.status(200).send({
      newUser: newUser.rows[0],
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = userRouter;
