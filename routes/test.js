const express = require('express');
const pool = require('../config');

const testRouter = express();

testRouter.get('/', async (req, res) => {
  try {
    const user = await pool.query(`SELECT * FROM users`);
    res.send({
      account: user.rows,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = testRouter;
