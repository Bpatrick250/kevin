const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const adminSeeder = async () => {
  const Admin = require('../models/Admin.model');
  
  const admins = [
    {
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL || 'admin@rlg.org',
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      role: 'super_admin',
      isActive: true,
      permissions: ['manage_users', 'manage_blogs', 'manage_programs', 'manage_events', 'manage_gallery', 'manage_donations', 'manage_testimonials', 'view_analytics'],
    },
    {
      name: 'Content Manager',
      email: 'content@rlg.org',
      password: 'Content@123',
      role: 'moderator',
      isActive: true,
      permissions: ['manage_blogs', 'manage_programs', 'manage_gallery', 'manage_testimonials'],
    },
  ];
  
  for (const admin of admins) {
    const existing = await Admin.findOne({ email: admin.email });
    if (!existing) {
      admin.password = await bcrypt.hash(admin.password, 12);
      await Admin.create(admin);
      console.log(`✅ Admin created: ${admin.email}`);
    } else {
      console.log(`⚠️ Admin already exists: ${admin.email}`);
    }
  }
};

module.exports = adminSeeder;