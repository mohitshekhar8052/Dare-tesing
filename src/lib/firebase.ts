import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyABXx6NtGqqsj-CfSVddIsGDKj1rc6CrnA",
  authDomain: "dareup-d3756.firebaseapp.com",
  projectId: "dareup-d3756",
  storageBucket: "dareup-d3756.firebasestorage.app",
  messagingSenderId: "205880537186",
  appId: "1:205880537186:web:f16e518b74d86573b2e13b",
  measurementId: "G-TEJQM8Z0HX"
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
