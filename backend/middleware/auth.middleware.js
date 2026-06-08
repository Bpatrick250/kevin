const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Admin = require('../models/Admin.model');
const { ApiResponse } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } 
    // Check for token in cookies
    else if (req.cookies.token) {
      token = req.cookies.token;
    }
    
    if (!token) {
      return ApiResponse.unauthorized(res, 'Not authorized, no token');
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user exists
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return ApiResponse.unauthorized(res, 'User not found');
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return ApiResponse.unauthorized(res, 'Invalid token');
    }
    if (error.name === 'TokenExpiredError') {
      return ApiResponse.unauthorized(res, 'Token expired');
    }
    return ApiResponse.error(res, error.message);
  }
};

const adminProtect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    
    if (!token) {
      return ApiResponse.unauthorized(res, 'Not authorized, no token');
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    
    if (!admin) {
      return ApiResponse.unauthorized(res, 'Admin not found');
    }
    
    req.admin = admin;
    next();
  } catch (error) {
    return ApiResponse.unauthorized(res, 'Not authorized as admin');
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return ApiResponse.forbidden(res, 'You do not have permission to perform this action');
    }
    next();
  };
};

module.exports = { protect, adminProtect, authorize };