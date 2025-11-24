# Firebase App Hosting - Environment Variables Setup

## Problem
Your `.env.local` file is only for local development and is not deployed to production. Firebase App Hosting needs environment variables configured separately.

## Solution: Set Environment Variables in Firebase Console

### Step 1: Go to App Hosting Backend Settings

1. Open [Firebase Console - App Hosting](https://console.firebase.google.com/project/beautypalace-52beb/apphosting)
2. Click on your backend: **beautypalace-backend**
3. Go to the **"Environment variables"** or **"Configuration"** section
4. Click **"Add variable"** or **"Edit variables"**

### Step 2: Add These Environment Variables

Add each of these variables one by one:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA0RoB3mIN6FSxIWzXMWDcyUAtIErDNoRM
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=beautypalace-52beb.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=beautypalace-52beb
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=beautypalace-52beb.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=700511361684
NEXT_PUBLIC_FIREBASE_APP_ID=1:700511361684:web:e723c6213cbe019865b281
```

### Step 3: Save and Redeploy

After adding the variables:
1. Click **"Save"** or **"Update"**
2. Firebase App Hosting will automatically trigger a new deployment
3. Wait for the deployment to complete (check the deployment status)

### Alternative: Direct Console Link

Go directly to your backend settings:
https://console.firebase.google.com/project/beautypalace-52beb/apphosting/backends/beautypalace-backend

## Verify

After deployment completes:
1. Visit your live site: https://beautypalace-52beb.web.app
2. Try logging in as admin
3. Check browser console for any Firebase errors (should be none)

## Note

These are `NEXT_PUBLIC_*` variables, which means they're safe to expose in the client-side code. They're meant to be public and are included in your JavaScript bundle.

