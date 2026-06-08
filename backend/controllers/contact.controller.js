const Contact = require('../models/Contact.model');
const { sendContactReply } = require('../utils/sendEmail');
const { ApiResponse } = require('../utils/apiResponse');

const submitContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });
    return ApiResponse.created(res, contact, 'Message sent successfully');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return ApiResponse.success(res, contacts);
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return ApiResponse.notFound(res, 'Contact not found');
    return ApiResponse.success(res, contact);
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return ApiResponse.notFound(res, 'Contact not found');
    contact.status = 'read';
    await contact.save();
    return ApiResponse.success(res, contact, 'Marked as read');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const replyToContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return ApiResponse.notFound(res, 'Contact not found');
    
    contact.status = 'replied';
    contact.repliedBy = req.admin._id;
    contact.repliedAt = new Date();
    contact.replyMessage = req.body.reply;
    await contact.save();
    
    await sendContactReply(contact.email, contact.name, req.body.reply, contact.message);
    
    return ApiResponse.success(res, contact, 'Reply sent successfully');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return ApiResponse.notFound(res, 'Contact not found');
    await contact.deleteOne();
    return ApiResponse.success(res, null, 'Contact deleted');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    return ApiResponse.success(res, stats);
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  getContactById,
  markAsRead,
  replyToContact,
  deleteContact,
  getContactStats,
};