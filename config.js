const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.AWS_USER,
  host: process.env.HOST,
  database: process.env.AWS_DB_NAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
