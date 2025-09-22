import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getFirebase } from './firebase.js'

const DOC_PATH = 'config/site'

export async function getSiteInfo() {
  const { db } = await getFirebase()
  const ref = doc(db, DOC_PATH)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}

export async function updateSiteInfo(data) {
  const { db } = await getFirebase()
  const ref = doc(db, DOC_PATH)
  await setDoc(ref, data, { merge: true })
}


