/** protect the different routes with have */
const jwt = require('jsonwebtoken'); //help get payload from token
const asyncHandler = require('express-async-handler');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const userModel = require('../models/user.js');

const secret = process.env.SECRET_KEY;

/**
 * protect the routes
 * you have to be logged in to access the route
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;
  // console.log(req);

  token = req.cookies.jwt; //

  console.log('token', token);
  //checking for the cookie
  if (token) {
    try {
      const decoded = jwt.verify(token, secret); // access token and breakdown the information store in the token.

      //will be access form any route
      req.user = await userModel.findById(decoded.userID).select('-password'); // get user minus  password
      next();
    } catch (error) {
      res.status(401);
      throw new Error('not authorized, invalid token');
    }
  } else {
    res.status(401);
    throw new Error('not authorized , no token');
  }
});

module.exports = { protect };
