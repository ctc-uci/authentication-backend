const express = require('express');

const authRouter = express();
const admin = require('../firebase');

authRouter.use(express.json());

const verifyToken = async (req, res, next) => {
  //   console.log('@verifyToken in'}
  //   console.log(req);

  try {
    const {
      cookies: {accessToken},
    } = req;

    if (!accessToken) {
      return res.status(400).send('@verifyToken no access token');
    }
    const decodedToken = await admin.auth().verifyIdToken(accessToken);
    if (!decodedToken) {
      return res.status(400).send('Empty token from firebase');
    }
    // console.log(decodedToken);

    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).send('@verifyToken no access token');
  }
};

authRouter.get('/verifyToken/:accessToken', async (req, res) => {
  try {
    // console.log('hello');
    // console.log(req);
    const {accessToken} = req.params;
    const decodedToken = await admin.auth().verifyIdToken(accessToken);
    res.status(200).send(decodedToken.uid);
  } catch (err) {
    res.status(400).send('@verifyToken no access token');
  }
});

module.exports = {verifyToken, authRouter};
