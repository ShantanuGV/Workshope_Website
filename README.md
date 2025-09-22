# CIED Cell Website (Vite + React + Firebase)

Full-stack single-page app for College Innovation, Entrepreneurship & Development Cell.

## Features
- Public pages: Home, Vision & Mission, Events, Team, Blogs, Startups
- Admin portal: Firebase Auth protected; CRUD for Events, Team, Blogs, Startups, Site Info
- Data: Firebase Firestore; Media: Firebase Storage
- Config from JSON: `public/firebase.config.json`

## Getting Started
1. Install deps:
```bash
npm install
```
2. Add Firebase config:
   - Create a Firebase project, enable Email/Password in Authentication
   - Create Firestore in production or test mode
   - Optional: enable Storage
   - Copy your web app config and update `public/firebase.config.json`:
```json
{
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_AUTH_DOMAIN",
  "projectId": "YOUR_PROJECT_ID",
  "storageBucket": "YOUR_STORAGE_BUCKET",
  "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
  "appId": "YOUR_APP_ID"
}
```
3. Run dev:
```bash
npm run dev
```

## Admin
- Visit `/admin/login` and sign in with an email/password you created in Firebase Auth Users.
- Manage content via sidebar sections.

## Firestore Structure
- `events`: { title, description, date }
- `team`: { name, role, photoUrl }
- `blogs`: { title, content, createdAt }
- `startups`: { name, description, website }
- `config/site` document: { title, tagline, about }

## Notes
- This starter loads Firebase config from `/firebase.config.json` at runtime.
- Add rules in Firebase console to secure read/write as needed.
