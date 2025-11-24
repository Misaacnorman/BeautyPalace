# BeautyPalace - Makeup & Hair Styling Website

A modern, professional website for a makeup and hair styling business built with Next.js, TypeScript, React, Tailwind CSS, and Firebase.

## Features

### Public Website
- **Home Page**: Hero section, services summary, featured gallery images, and reviews highlight
- **Gallery Page**: Responsive image grid with tag filters (Bridal, Soft Glam, Natural, Bold, Hair)
- **Services Page**: Service cards with descriptions, pricing, and booking links
- **Reviews Page**: Display approved reviews with overall rating and review submission form
- **Booking Page**: Form to submit appointment requests with validation
- **Contact/FAQ Page**: Artist bio, location, social links, and expandable FAQs

### Admin Dashboard
- **Authentication**: Secure admin login with Firebase Auth
- **Bookings Management**: View, filter, and update booking statuses with internal notes
- **Gallery Management**: Upload images, edit captions/tags, mark as featured, and delete
- **Review Moderation**: Approve or reject submitted reviews
- **Site Settings**: Configure branding, colors, text, and social links without code changes

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase
  - Firestore (Database)
  - Firebase Storage (Image uploads)
  - Firebase Auth (Admin authentication)
  - Firebase Hosting (Deployment)

## Prerequisites

- Node.js 18+ and npm
- Firebase account
- Git (optional)

## Setup Instructions

### 1. Clone and Install

```bash
# Navigate to project directory
cd BeautyPalace

# Install dependencies
npm install
```

### 2. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable the following services:
   - **Authentication**: 
     - Go to Authentication > Sign-in method
     - Enable Email/Password provider
   - **Firestore Database**:
     - Go to Firestore Database
     - Create database in production mode
     - Set up security rules (see below)
   - **Storage**:
     - Go to Storage
     - Get started with default rules
     - Set up security rules (see below)

4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click the web icon (`</>`) to add a web app
   - Copy the Firebase configuration object

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the values with your actual Firebase configuration.

### 4. Firebase Security Rules

#### Firestore Rules

Go to Firestore Database > Rules and use:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Bookings: public can create, admin can read/write
    match /bookings/{bookingId} {
      allow create: if request.auth == null;
      allow read, write: if request.auth != null;
    }
    
    // Reviews: public can create, anyone can read approved, admin can write
    match /reviews/{reviewId} {
      allow create: if request.auth == null;
      allow read: if resource.data.status == 'approved' || request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Photos: public can read, admin can write
    match /photos/{photoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Settings: public can read, admin can write
    match /settings/{settingsId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

#### Storage Rules

Go to Storage > Rules and use:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /photos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 5. Create Admin Account

1. Go to Firebase Console > Authentication
2. Click "Add user" or "Users" tab
3. Add a new user with email and password
4. This will be your admin account

### 6. Initialize Default Settings (Optional)

You can manually create a settings document in Firestore:

1. Go to Firestore Database
2. Create a collection named `settings`
3. Add a document with the following fields:
   - `siteName` (string): Your business name
   - `tagline` (string): Short tagline
   - `primaryColor` (string): Hex color code (e.g., "#dc2626")
   - `heroHeadline` (string): Main headline for homepage
   - `heroSubtext` (string): Subtext for homepage
   - `WhatsAppNumber` (string): Your WhatsApp number
   - `InstagramUrl` (string): Instagram profile URL
   - `TikTokUrl` (string): TikTok profile URL
   - `location` (string): Your location/city
   - `bio` (string): Artist bio

Alternatively, you can use the admin dashboard to set these after logging in.

### 7. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Firebase Hosting

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Firebase Hosting

```bash
firebase init hosting
```

When prompted:
- Select "Use an existing project" and choose your Firebase project
- Set public directory to: `.next`
- Configure as single-page app: **No**
- Set up automatic builds: **No** (or Yes if using GitHub Actions)
- Overwrite index.html: **No**

### 4. Build and Deploy

**Option 1: Deploy to Vercel (Recommended for Next.js)**

Vercel is the recommended platform for Next.js applications:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Option 2: Deploy to Firebase Hosting**

For Firebase Hosting, you'll need to configure it for Next.js:

```bash
# Build the Next.js app
npm run build

# Note: Firebase Hosting works best with static sites.
# For full Next.js features, consider using Vercel or Firebase Functions.
# For static export, update next.config.js to include:
# output: 'export'
# Then deploy:
firebase deploy --only hosting
```

**Note**: For production, consider using Vercel (optimized for Next.js) or setting up Firebase Functions for server-side features.

Your site will be live at `https://your-project-id.web.app`

## Project Structure

```
BeautyPalace/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin pages (login, dashboard)
│   ├── gallery/           # Gallery page
│   ├── services/          # Services page
│   ├── reviews/           # Reviews page
│   ├── booking/           # Booking page
│   ├── contact/           # Contact/FAQ page
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Navbar, Footer
│   ├── public/            # Public page components
│   └── admin/             # Admin components
├── lib/
│   ├── firebase/          # Firebase configuration and helpers
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── hooks/                 # Custom React hooks
└── middleware.ts          # Route protection
```

## Usage

### Admin Access

1. Navigate to `/admin/login`
2. Sign in with your Firebase admin account credentials
3. Access the dashboard to manage:
   - **Bookings**: View and update booking statuses
   - **Gallery**: Upload and manage photos
   - **Reviews**: Moderate submitted reviews
   - **Settings**: Configure site branding and content

### Public Features

- Visitors can browse gallery, view services, read reviews, and submit booking requests
- Reviews submitted by visitors are set to "pending" status and require admin approval
- Bookings are saved with "pending" status and can be updated by admin

## Customization

### Colors

The primary color can be changed in the admin Settings tab. The Tailwind config uses a custom color palette that can be modified in `tailwind.config.ts`.

### Services

Services are currently hardcoded in the pages. You can:
1. Move services to Firestore for dynamic management
2. Add a Services tab in the admin dashboard
3. Update the service data in `app/services/page.tsx` and `app/booking/page.tsx`

### Mock Data

The project includes mock data for:
- Services (5 services)
- FAQs (5 questions)
- Default settings (can be configured via admin)

## Troubleshooting

### Firebase Connection Issues

- Verify all environment variables are set correctly in `.env.local`
- Check Firebase project settings match your configuration
- Ensure Firestore and Storage are enabled in Firebase Console

### Image Upload Issues

- Verify Storage security rules allow authenticated writes
- Check file size limits (Firebase Storage default is 5GB per file)
- Ensure images are valid image formats (jpg, png, etc.)

### Authentication Issues

- Verify Email/Password provider is enabled in Firebase Auth
- Check that admin account exists in Firebase Console
- Clear browser cache and cookies if login persists

## Support

For issues or questions, please check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is private and proprietary.

