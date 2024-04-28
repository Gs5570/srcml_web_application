const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET_KEY;

const generateToken = (res, userID) => {
  const token = jwt.sign({ userID }, secret, { expiresIn: '1h' }); // create and sign the token.
  //save token in cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // force the site to use of https
    sameSite: 'strict', //prevent csrf attack
    maxAge: 36000, //one 1h expressed in second;'
  });
};

module.exports = { generateToken };
