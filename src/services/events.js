import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { getFirebase } from './firebase.js'

const COLLECTION = 'events'

export async function listEvents() {
  const { db } = await getFirebase()
  const q = query(collection(db, COLLECTION), orderBy('date', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createEvent(data) {
  const { db } = await getFirebase()
  await addDoc(collection(db, COLLECTION), data)
}

export async function deleteEvent(id) {
  const { db } = await getFirebase()
  await deleteDoc(doc(db, COLLECTION, id))
}


