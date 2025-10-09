import { collection, addDoc, getDocs, getDoc, deleteDoc, doc, orderBy, query, updateDoc, arrayUnion, increment } from 'firebase/firestore'
import { getFirebase } from './firebase.js'

const COLLECTION = 'blogs'

export async function listBlogs() {
  const { db } = await getFirebase()
  const q = query(collection(db, COLLECTION), orderBy('order', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getBlog(id) {
  const { db } = await getFirebase()
  const blogRef = doc(db, COLLECTION, id);
  await updateDoc(blogRef, { views: increment(1) });
  const snap = await getDoc(blogRef)
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function createBlog(data) {
  const { db } = await getFirebase()
  const q = query(collection(db, COLLECTION))
  const snap = await getDocs(q)
  const order = snap.docs.length
  await addDoc(collection(db, COLLECTION), { ...data, createdAt: Date.now(), comments: [], views: 0, order })
}

export async function deleteBlog(id) {
  const { db } = await getFirebase()
  await deleteDoc(doc(db, COLLECTION, id))
}

export async function addComment(id, comment) {
  const { db } = await getFirebase()
  await updateDoc(doc(db, COLLECTION, id), {
    comments: arrayUnion(comment)
  })
}

export async function updateBlog(id, data) {
  const { db } = await getFirebase()
  await updateDoc(doc(db, COLLECTION, id), data)
}
