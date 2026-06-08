require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Import configs
const { connectDB } = require('./config/database.config');
const { errorMiddleware } = require('./middleware/error.middleware');
const logger = require('./utils/logger');

// Import routes
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');
const blogRoutes = require('./routes/blog.routes');
const programRoutes = require('./routes/program.routes');
const galleryRoutes = require('./routes/gallery.routes');
const eventRoutes = require('./routes/event.routes');
const contactRoutes = require('./routes/contact.routes');
const donationRoutes = require('./routes/donation.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const uploadRoutes = require('./routes/upload.routes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Rate limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'RLG API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot find ${req.originalUrl} on this server`
  });
});

// Error handling middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV}`);
  logger.info(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});

module.exports = app;