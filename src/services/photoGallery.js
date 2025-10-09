import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query, updateDoc } from 'firebase/firestore'
import { getFirebase } from './firebase.js'

const COLLECTION = 'photoGallery'

export async function listPhotos() {
  const { db } = await getFirebase()
  const q = query(collection(db, COLLECTION), orderBy('order', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createPhoto(data) {
  const { db } = await getFirebase()
  const q = query(collection(db, COLLECTION))
  const snap = await getDocs(q)
  const order = snap.docs.length
  await addDoc(collection(db, COLLECTION), { ...data, order })
}

export async function updatePhoto(id, data) {
  const { db } = await getFirebase()
  await updateDoc(doc(db, COLLECTION, id), data)
}

export async function deletePhoto(id) {
  const { db } = await getFirebase()
  await deleteDoc(doc(db, COLLECTION, id))
}
