# Local Testing Guide

## Quick Start

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   - Navigate to: http://localhost:3000
   - The server should automatically reload when you make changes

## Firebase Configuration for Local Testing

To test features that require Firebase (bookings, gallery, reviews, admin), you need to set up Firebase:

### Option 1: Use Mock/Demo Mode (Quick Testing)

The app will work for viewing pages, but Firebase features will show errors until configured. You can:
- View all public pages (Home, Gallery, Services, Reviews, Contact)
- See the UI and layout
- Test navigation

### Option 2: Full Firebase Setup (Recommended)

1. **Create `.env.local` file** in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

2. **Get Firebase credentials:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing
   - Go to Project Settings > General
   - Scroll to "Your apps" and click the web icon (`</>`)
   - Copy the config values to `.env.local`

3. **Enable Firebase services:**
   - **Authentication**: Enable Email/Password provider
   - **Firestore**: Create database in test mode (for local testing)
   - **Storage**: Get started with default rules

4. **Restart the dev server** after creating `.env.local`:
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

## Testing Features

### Public Pages (No Auth Required)
- ✅ Home page: http://localhost:3000
- ✅ Gallery: http://localhost:3000/gallery
- ✅ Services: http://localhost:3000/services
- ✅ Reviews: http://localhost:3000/reviews
- ✅ Booking: http://localhost:3000/booking
- ✅ Contact: http://localhost:3000/contact

### Admin Features (Requires Firebase Auth)
- 🔐 Admin Login: http://localhost:3000/admin/login
- 🔐 Admin Dashboard: http://localhost:3000/admin/dashboard

**To test admin features:**
1. Create an admin account in Firebase Console > Authentication
2. Use that email/password to log in at `/admin/login`

## Troubleshooting

### Port Already in Use
If port 3000 is busy:
```bash
# Use a different port
npm run dev -- -p 3001
```

### Firebase Connection Errors
- Check that `.env.local` exists and has correct values
- Restart the dev server after changing env variables
- Verify Firebase services are enabled in Firebase Console

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Hot Reload

The dev server automatically reloads when you:
- Save changes to `.tsx`, `.ts`, `.css` files
- Modify components or pages
- Update configuration files

Just save your file and check the browser - changes appear instantly!

