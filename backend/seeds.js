const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const Admin = require('./models/Admin.model');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rlg_database');
    console.log('📦 Connected to MongoDB');

    // Create default admin
    const existingAdmin = await Admin.findOne({ email: 'admin@rlg.org' });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const admin = new Admin({
        name: 'Super Admin',
        email: 'admin@rlg.org',
        password: hashedPassword,
        role: 'super_admin',
        isActive: true,
        permissions: [
          'manage_users', 
          'manage_blogs', 
          'manage_programs', 
          'manage_events', 
          'manage_gallery', 
          'manage_donations', 
          'manage_testimonials', 
          'view_analytics'
        ],
        phone: '+250788123456',
      });
      
      await admin.save();
      console.log('✅ Default admin created:');
      console.log('   Email: admin@rlg.org');
      console.log('   Password: admin123');
    } else {
      console.log('⚠️ Admin already exists with email: admin@rlg.org');
      
      // Optional: Reset password
      const resetPassword = await bcrypt.hash('admin123', 10);
      existingAdmin.password = resetPassword;
      await existingAdmin.save();
      console.log('✅ Password reset to: admin123');
    }

    console.log('\n🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();