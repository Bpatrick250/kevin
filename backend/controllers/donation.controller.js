const Donation = require('../models/Donation.model');
const { sendDonationReceipt } = require('../utils/sendEmail');
const { ApiResponse } = require('../utils/apiResponse');
const crypto = require('crypto');

const createDonation = async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    return ApiResponse.created(res, donation, 'Donation initiated');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    return ApiResponse.success(res, donations);
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return ApiResponse.notFound(res, 'Donation not found');
    return ApiResponse.success(res, donation);
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const updateDonationStatus = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return ApiResponse.notFound(res, 'Donation not found');
    
    donation.status = req.body.status;
    if (req.body.status === 'completed') {
      donation.transactionId = crypto.randomBytes(16).toString('hex');
      await sendDonationReceipt(donation.email, donation.fullName, donation.amount, donation.transactionId);
    }
    await donation.save();
    
    return ApiResponse.success(res, donation, 'Status updated');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return ApiResponse.notFound(res, 'Donation not found');
    await donation.deleteOne();
    return ApiResponse.success(res, null, 'Donation deleted');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const getDonationStats = async (req, res) => {
  try {
    const total = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);
    const monthly = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: { $month: '$createdAt' }, total: { $sum: '$amount' } } }
    ]);
    return ApiResponse.success(res, { total: total[0] || { total: 0, count: 0 }, monthly });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const processMobileMoneyPayment = async (req, res) => {
  try {
    // This would integrate with MTN/Airtel API
    // For now, simulate payment
    const { phoneNumber, amount } = req.body;
    return ApiResponse.success(res, { message: 'Payment processing', reference: crypto.randomBytes(8).toString('hex') });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const getDonationReceipt = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return ApiResponse.notFound(res, 'Donation not found');
    return ApiResponse.success(res, donation);
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonationStatus,
  deleteDonation,
  getDonationStats,
  processMobileMoneyPayment,
  getDonationReceipt,
};