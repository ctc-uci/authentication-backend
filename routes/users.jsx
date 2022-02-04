// Routes relating to accounts here
const express = require('express');

const userRouter = express();
const pool = require('../config');

userRouter.use(express.json());

// Get a specific user by email
userRouter.get('/:email', async (req, res) => {
  console.log('request made to /:id route');

  const {email} = req.params;
  try {
    const user = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
    res.send({
      account: user.rows[0],
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Add user to database
userRouter.post('/create', async (req, res) => {
  console.log('POST /user/create in');
  console.log(req.body);

  try {
    const {email, userId, role} = req.body;

    const newAccount = await pool.query(`
    INSERT INTO users (email, user_id, role)
    VALUES ('${email}', '${userId}', '${role}')
    RETURNING *
  `);

    res.status(200).send({
      newAccount: newAccount.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

module.exports = userRouter;
