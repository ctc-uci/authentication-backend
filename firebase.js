const admin = require('firebase-admin');

require('dotenv').config();

const credentials = require('./auth-dev-90d20-firebase-adminsdk-7k0yw-5c633a4fb2.json');

admin.initializeApp({credential: admin.credential.cert(credentials)});

module.exports = admin;
