# Firebase Setup Guide

## Quick Setup

To fix the "Firebase: Error (auth/invalid-api-key)" error, you need to create a `.env.local` file with your Firebase credentials.

## Steps

1. **Create `.env.local` file** in the root directory (same level as `package.json`)

2. **Add your Firebase configuration:**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

3. **Get your Firebase credentials:**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project (or select existing)
   - Click the gear icon ⚙️ > Project Settings
   - Scroll to "Your apps" section
   - Click the web icon (`</>`) to add a web app
   - Copy the config values to your `.env.local` file

4. **Restart your dev server** after creating `.env.local`:
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

## Demo Mode

If you don't have Firebase set up yet, the app will work in **demo mode**:
- ✅ All pages will load
- ✅ UI and navigation will work
- ❌ Firebase features won't work (bookings, gallery, admin login)

You'll see console warnings, but the app won't crash.

## Verify Setup

After setting up `.env.local` and restarting:
- No console errors about Firebase
- Admin login page loads without errors
- You can test Firebase features

