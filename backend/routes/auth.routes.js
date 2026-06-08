const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { register, login, getMe, logout, forgotPassword, resetPassword, updateProfile } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');
const { authLimiter } = require('../middleware/rateLimit.middleware');

// Validation rules
const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Admin login route
router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).select('+password');
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    admin.lastLogin = new Date();
    await admin.save();
    
    const token = generateToken(admin._id, admin.role);
    
    res.json({
      success: true,
      data: {
        token,
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get admin profile
router.get('/admin-me', adminProtect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// Routes
router.post('/register', registerValidation, validate, register);
router.post('/login', authLimiter, loginValidation, validate, login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.post('/forgot-password', body('email').isEmail(), validate, forgotPassword);
router.post('/reset-password/:token', body('password').isLength({ min: 6 }), validate, resetPassword);
router.put('/profile', protect, updateProfile);

module.exports = router;