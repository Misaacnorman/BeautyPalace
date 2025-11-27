// Script to seed initial data to Firestore
// Run with: node scripts/seed-initial-data.js
// Make sure to set up Firebase Admin SDK or use Firebase CLI

const admin = require('firebase-admin');

// Initialize Firebase Admin (you'll need to set up service account)
// For now, this is a template - you'll need to configure it based on your setup

const initialSettings = {
  siteName: 'BeautyPalace',
  tagline: 'Professional beauty and makeup services',
  primaryColor: '#dc2626',
  heroHeadline: 'Bringing Your Dream Look to Life',
  heroSubtext: 'Professional makeup and hair styling services for your special moments',
  WhatsAppNumber: '+1234567890', // Update with your number
  phoneNumber: '+1234567890', // Optional
  InstagramUrl: 'https://instagram.com/yourusername', // Update with your Instagram
  TikTokUrl: 'https://tiktok.com/@yourusername', // Update with your TikTok
  location: 'Your City, State', // Update with your location
  bio: 'Professional makeup artist and hair stylist with years of experience creating beautiful looks for weddings, events, and photoshoots. Specializing in bridal makeup, soft glam, and hair styling.',
};

async function seedData() {
  try {
    // Initialize admin SDK (you'll need to set this up)
    // const serviceAccount = require('./path-to-service-account-key.json');
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount)
    // });

    const db = admin.firestore();

    // Create settings document
    const settingsRef = db.collection('settings');
    const snapshot = await settingsRef.get();
    
    if (snapshot.empty) {
      await settingsRef.add(initialSettings);
      console.log('✅ Initial settings created successfully!');
    } else {
      console.log('⚠️  Settings document already exists. Skipping...');
    }

    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

// Uncomment to run (after setting up Firebase Admin SDK)
// seedData();

console.log('📝 This is a template script. To use it:');
console.log('1. Install firebase-admin: npm install firebase-admin');
console.log('2. Set up Firebase Admin SDK with service account');
console.log('3. Uncomment the seedData() call');
console.log('4. Update the initialSettings values with your actual data');

