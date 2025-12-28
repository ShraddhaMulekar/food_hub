const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { registerPage } = require('../pages/registerPage');
const { registerBodyReq } = require('../bodyReq/register-body-req');
const { loginBodyReq } = require('../bodyReq/login-body-req');
const { loginPage } = require('../pages/loginPage');
const { mePage } = require('../pages/me');
const { profileBodyReq } = require('../bodyReq/profile-body-req');
const { profilePage } = require('../pages/proflePage');
const { passwordBodyReq } = require('../bodyReq/password-body-req');
const { passwordPage } = require('../pages/passwordPage');
const { logoutPage } = require('../pages/logoutPage');
const { refreshPage } = require('../pages/refreshPage');
const { forgotPasswordPage } = require('../pages/forgotPasswordPage');
const { resetPasswordBodyReq } = require('../bodyReq/reset-password-body-req');
const { resetPasswordPage } = require('../pages/resetPasswordPage');
const { forgotPasswordBodyReq } = require('../bodyReq/forgot-password-body-req');

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user (no OTP)
// @access  Public
router.post('/register', registerBodyReq, registerPage);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginBodyReq, loginPage);

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, mePage);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, profileBodyReq, profilePage);

// @route   PUT /api/auth/password
// @desc    Change password
// @access  Private
router.put('/password', protect, passwordBodyReq, passwordPage);

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', protect, logoutPage);

// @route   POST /api/auth/refresh
// @desc    Refresh JWT token
// @access  Private
router.post('/refresh', protect, refreshPage);

// @route   POST /api/auth/forgot-password
// @desc    Check if email exists for password reset
// @access  Public
router.post('/forgot-password', forgotPasswordBodyReq, forgotPasswordPage);

// @route   POST /api/auth/reset-password
// @desc    Reset password with email verification
// @access  Public
router.post('/reset-password', resetPasswordBodyReq, resetPasswordPage);

module.exports = router; 