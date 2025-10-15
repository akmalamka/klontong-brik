import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

// ONLY FOR LOCAL DEVELOPMENT/TESTING WITH EMULATOR
if (import.meta.env.DEV) { // Check if in development mode (Vite's built-in env var)
  connectAuthEmulator(auth, 'http://localhost:9099')
}

export { auth, app as firebaseApp }
