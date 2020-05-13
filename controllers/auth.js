const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Get logged in user
// @route   GET /api/v1/auth
// @access  Public
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth
// @access  Public
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // See if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'User not found',
      });
    }

    // Decrypt stored password and compare with plaintext password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // If email and password are correct, issue new JWT
    const payload = {
      user: {
        email: user.email,
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
        });
      }
    );
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        sucess: false,
        error: 'Server error',
      });
    }
  }
};
