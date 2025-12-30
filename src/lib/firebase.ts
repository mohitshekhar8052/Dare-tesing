import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB7M5fMm_ylKvs1R8mHP6QE3RtGqkIL9rk",
  authDomain: "dareup-29f62.firebaseapp.com",
  projectId: "dareup-29f62",
  storageBucket: "dareup-29f62.firebasestorage.app",
  messagingSenderId: "226096221232",
  appId: "1:226096221232:web:e2334fd1d91c10a0bb71f5",
  measurementId: "G-1PVRVB3T5F"
}

// Initialize Firebase app
let app: FirebaseApp
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp()
}

// Initialize services
export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)
export const storage: FirebaseStorage = getStorage(app)

let analytics: any = null
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app as any)
  } catch (e) {
    // Analytics can fail to initialize on non-browser or in restricted environments
    analytics = null
  }
}

export { analytics }
