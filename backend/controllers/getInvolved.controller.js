const GetInvolved = require('../models/GetInvolved.model');
const { sendEmail } = require('../utils/sendEmail');
const { ApiResponse } = require('../utils/apiResponse');

// @desc    Submit get involved form
// @route   POST /api/getinvolved
// @access  Public
const submitGetInvolved = async (req, res) => {
  try {
    const { fullName, email, phone, organization, interest, district, message } = req.body;
    
    // Create submission
    const submission = await GetInvolved.create({
      fullName,
      email,
      phone,
      organization,
      interest,
      district,
      message,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });
    
    // Send confirmation email to user
    try {
      const userHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center;">
            <img src="https://via.placeholder.com/100x100/22c55e/white?text=RLG" alt="RLG Logo" style="width: 80px;">
            <h2 style="color: #14532d;">Thank You, ${fullName}!</h2>
          </div>
          <p>Your application to ${interest} has been received successfully.</p>
          <p>An RLG coordinator will contact you within <strong>3-5 business days</strong> via email or phone.</p>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #14532d; margin-top: 0;">Your Application Details:</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Interest:</strong> ${interest}</p>
            ${district ? `<p><strong>District:</strong> ${district}</p>` : ''}
          </div>
          <p>In the meantime, feel free to explore our website and learn more about our programs.</p>
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/programs" style="background: #22c55e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Explore Programs</a>
          <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">© ${new Date().getFullYear()} Rising Leaders of Generation. All rights reserved.</p>
        </div>
      `;
      
      await sendEmail({
        email,
        subject: `Application Received - ${interest}`,
        html: userHtml,
      });
    } catch (emailError) {
      console.log('Email sending failed:', emailError.message);
    }
    
    // Send notification email to admin
    try {
      const adminHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #14532d;">New Get Involved Application</h2>
          <p>A new application has been submitted on the RLG website.</p>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #14532d; margin-top: 0;">Application Details:</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Organization/School:</strong> ${organization || 'Not provided'}</p>
            <p><strong>Interest:</strong> ${interest}</p>
            <p><strong>District:</strong> ${district || 'Not provided'}</p>
            <p><strong>Message:</strong> ${message || 'No message provided'}</p>
          </div>
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/getinvolved" style="background: #22c55e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Panel</a>
        </div>
      `;
      
      await sendEmail({
        email: process.env.ADMIN_EMAIL || 'admin@rlg.org',
        subject: `New Get Involved Application - ${interest}`,
        html: adminHtml,
      });
    } catch (emailError) {
      console.log('Admin email sending failed:', emailError.message);
    }
    
    return ApiResponse.created(res, submission, 'Application submitted successfully! A coordinator will contact you soon.');
  } catch (error) {
    console.error('Get Involved submission error:', error);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Get all get involved submissions
// @route   GET /api/getinvolved
// @access  Private/Admin
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await GetInvolved.find()
      .sort({ createdAt: -1 })
      .populate('contactedBy', 'name email');
    
    return ApiResponse.success(res, submissions);
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Get single submission
// @route   GET /api/getinvolved/:id
// @access  Private/Admin
const getSubmissionById = async (req, res) => {
  try {
    const submission = await GetInvolved.findById(req.params.id).populate('contactedBy', 'name email');
    if (!submission) {
      return ApiResponse.notFound(res, 'Submission not found');
    }
    return ApiResponse.success(res, submission);
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Update submission status
// @route   PATCH /api/getinvolved/:id/status
// @access  Private/Admin
const updateSubmissionStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const submission = await GetInvolved.findById(req.params.id);
    
    if (!submission) {
      return ApiResponse.notFound(res, 'Submission not found');
    }
    
    submission.status = status;
    if (notes) submission.notes = notes;
    if (status === 'contacted') {
      submission.contactedBy = req.admin._id;
      submission.contactedAt = new Date();
    }
    
    await submission.save();
    
    // Send status update email to user
    if (status === 'contacted') {
      try {
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #14532d;">Update on Your Application</h2>
            <p>Dear ${submission.fullName},</p>
            <p>An RLG coordinator has reviewed your application to ${submission.interest}.</p>
            <p><strong>Status:</strong> We have received your application and will contact you shortly.</p>
            ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
            <p>Thank you for your interest in joining RLG!</p>
          </div>
        `;
        await sendEmail({
          email: submission.email,
          subject: `Application Status Update - ${submission.interest}`,
          html: emailHtml,
        });
      } catch (emailError) {
        console.log('Status update email failed:', emailError.message);
      }
    }
    
    return ApiResponse.success(res, submission, 'Status updated successfully');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Delete submission
// @route   DELETE /api/getinvolved/:id
// @access  Private/Admin
const deleteSubmission = async (req, res) => {
  try {
    const submission = await GetInvolved.findById(req.params.id);
    if (!submission) {
      return ApiResponse.notFound(res, 'Submission not found');
    }
    
    await submission.deleteOne();
    return ApiResponse.success(res, null, 'Submission deleted successfully');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Get submission stats
// @route   GET /api/getinvolved/stats
// @access  Private/Admin
const getSubmissionStats = async (req, res) => {
  try {
    const stats = await GetInvolved.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    const interestStats = await GetInvolved.aggregate([
      { $group: { _id: '$interest', count: { $sum: 1 } } }
    ]);
    
    return ApiResponse.success(res, { stats, interestStats });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

module.exports = {
  submitGetInvolved,
  getAllSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  deleteSubmission,
  getSubmissionStats,
};