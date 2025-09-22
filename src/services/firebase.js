import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

let firebaseExports = null

export async function getFirebase() {
  if (firebaseExports) return firebaseExports
  const res = await fetch('/firebase.config.json', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to load firebase.config.json')
  const config = await res.json()
  const app = getApps().length ? getApps()[0] : initializeApp(config)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage = getStorage(app)
  firebaseExports = { app, auth, db, storage }
  return firebaseExports
}


