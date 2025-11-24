/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  env: {
    // Map Firebase App Hosting's automatically provided config to NEXT_PUBLIC_* variables
    // This allows client-side code to access Firebase config
    // If FIREBASE_WEBAPP_CONFIG is provided (by App Hosting), parse and expose it
    ...(process.env.FIREBASE_WEBAPP_CONFIG ? (() => {
      try {
        const config = JSON.parse(process.env.FIREBASE_WEBAPP_CONFIG)
        return {
          NEXT_PUBLIC_FIREBASE_API_KEY: config.apiKey || process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: config.authDomain || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: config.projectId || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: config.storageBucket || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: config.messagingSenderId || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          NEXT_PUBLIC_FIREBASE_APP_ID: config.appId || process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        }
      } catch (e) {
        return {}
      }
    })() : {}),
  },
}

module.exports = nextConfig
