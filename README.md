# Dare — Next.js Starter

This repository contains a minimal Next.js + Tailwind + Firebase scaffold and the provided `Home` page.

Quick start

1. Install dependencies:

```bash
cd /Users/mohitkumar/Desktop/Dare
npm install
```

2. Add Firebase env vars in `.env.local` (example):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

3. Run dev server:

```bash
npm run dev
```

Notes
- Replace `public/assets/hero-characters.mp4` with your actual video file.
- Tailwind utilities and some UI helper classes are minimal; extend as needed.
