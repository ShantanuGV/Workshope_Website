import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { getFirebase } from './firebase.js'

const COLLECTION = 'startups'

export async function listStartups() {
  const { db } = await getFirebase()
  const q = query(collection(db, COLLECTION), orderBy('name'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createStartup(data) {
  const { db } = await getFirebase()
  await addDoc(collection(db, COLLECTION), data)
}

export async function deleteStartup(id) {
  const { db } = await getFirebase()
  await deleteDoc(doc(db, COLLECTION, id))
}


