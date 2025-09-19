
// Fix: Use v8 compat imports to resolve module export errors.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// IMPORTANT: ACTION REQUIRED!
//
// You are seeing this because you need to replace the placeholder values below
// with your actual Firebase project configuration.
//
// HOW TO GET YOUR CONFIG:
// 1. Go to the Firebase Console: https://console.firebase.google.com/
// 2. Create a new project (or select an existing one).
// 3. In your project, go to Project Settings (click the gear icon ⚙️).
// 4. In the "General" tab, scroll down to "Your apps".
// 5. If you don't have a web app, click the web icon (</>) to create one.
// 6. After creating it, you'll see a `firebaseConfig` object. Copy the values from there.
// 7. Paste the values into the object below.
//
// The app will not work until you do this!
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

export const firebaseConfig = {
  // Prefer environment variables (Vite: VITE_FIREBASE_*) so developers can keep
  // their own project credentials out of source control. Fall back to the
  // existing values if env vars are not provided (helps when the file already
  // contains valid credentials).
  // Use a cast to avoid TypeScript errors when `ImportMetaEnv` is not declared.
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY ?? "AIzaSyD94mzizCqDetLcY0HFo4K42H910fySs6E",
  authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN ?? "study-ef759.firebaseapp.com",
  databaseURL: (import.meta as any).env?.VITE_FIREBASE_DATABASE_URL ?? "https://study-ef759-default-rtdb.firebaseio.com",
  projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID ?? "study-ef759",
  storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET ?? "study-ef759.firebasestorage.app",
  messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "601251848281",
  appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID ?? "1:601251848281:web:b286bc7cf8d97fea99d148",
  measurementId: (import.meta as any).env?.VITE_FIREBASE_MEASUREMENT_ID ?? "G-N4D4VNSQB8"
};

// Check if the config is still using placeholder values or missing required fields.
// Only treat the config as "configured" when all key fields contain non-placeholder strings.
const placeholderValues = [
  "YOUR_API_KEY",
  "YOUR_AUTH_DOMAIN",
  "YOUR_PROJECT_ID",
  "YOUR_STORAGE_BUCKET",
  "YOUR_MESSAGING_SENDER_ID",
  "YOUR_APP_ID",
  "",
  null,
  undefined
];

function isValidField(value: unknown) {
  return typeof value === 'string' && !placeholderValues.includes(value);
}

export const isFirebaseConfigured =
  isValidField(firebaseConfig.apiKey) &&
  isValidField(firebaseConfig.authDomain) &&
  isValidField(firebaseConfig.projectId) &&
  isValidField(firebaseConfig.storageBucket) &&
  isValidField(firebaseConfig.messagingSenderId) &&
  isValidField(firebaseConfig.appId);

// Initialize Firebase
// Fix: Use v8 style initialization.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
