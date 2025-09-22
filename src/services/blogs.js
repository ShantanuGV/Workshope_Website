import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { getFirebase } from './firebase.js'

const COLLECTION = 'blogs'

export async function listBlogs() {
  const { db } = await getFirebase()
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createBlog(data) {
  const { db } = await getFirebase()
  await addDoc(collection(db, COLLECTION), { ...data, createdAt: Date.now() })
}

export async function deleteBlog(id) {
  const { db } = await getFirebase()
  await deleteDoc(doc(db, COLLECTION, id))
}


