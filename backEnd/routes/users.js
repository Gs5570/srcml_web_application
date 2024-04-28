const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const userModel = require('../models/user.js');

const JWT = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken.js');

const { protect } = require('../middleware/authMiddlware');

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

/**Authenticate user */
router.post(
  '/auth',
  asyncHandler(async function (req, res) {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    //check if user and password already exit
    if (existingUser && (await existingUser.matchPassword(password))) {
      generateToken(res, existingUser._id); // generate cookie for authentication
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
        msg: 'user updated successfully',
      });
    } else {
      res.status(401);
      throw new Error('invalid email or password');
    }
  })
);

/**Register new user*/
router.post(
  '/register',
  asyncHandler(async function (req, res) {
    const { username, email, password, role } = req.body;

    const existingUser = await userModel.findOne({ email });

    // check if user exist
    if (existingUser) {
      res.status(400);
      throw new Error('User already exists');
    }

    //create user
    const user = await userModel.create({
      username,
      email,
      password,
      role,
    });

    //check if user was created successfully
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400);
      throw new Error('error, user could not be created | invalid user data');
    }
  })
);
/**logout user*/
router.post(
  '/logout',
  asyncHandler(async function (req, res) {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0), // cookie expire wrightA way
    });
    res.status(200).json({ message: 'user logged out' });
  })
);
/**get user profile
 * protect middleware protect the routs for unauthorized access (user should be logged in)
 * private route
 */
router.get(
  '/getUserProfile',
  protect,
  asyncHandler(async function (req, res) {
    const user = {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    };
    res.status(200).json(user);
  })
);

/**update user profile*/
router.put(
  '/updateUserProfile',
  protect,
  asyncHandler(async function (req, res) {
    const user = await userModel.findById(req.user._id);

    // update user
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      //update password
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        msg: 'user updated successfully',
      });
    } else {
      res.status(404);
      throw new Error('user not found');
    }

    // console.log(req.user);
  })
);

module.exports = router;
