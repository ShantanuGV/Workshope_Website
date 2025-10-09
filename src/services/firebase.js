import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

let firebaseExports = null

async function initialize() {
    if (firebaseExports) return firebaseExports

    const response = await fetch('/firebase.config.json')
    const firebaseConfig = await response.json()

    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const db = getFirestore(app)
    const storage = getStorage(app)
    firebaseExports = { app, auth, db, storage }
    return firebaseExports
}

export async function getFirebase() {
  return initialize();
}
