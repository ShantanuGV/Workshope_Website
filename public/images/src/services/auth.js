import { useEffect, useState } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirebase } from './firebase.js'

export function useAuthState() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe = () => {}
    getFirebase().then(({ auth }) => {
      unsubscribe = onAuthStateChanged(auth, (u) => {
        setUser(u)
        setLoading(false)
      })
    })
    return () => unsubscribe()
  }, [])

  return { user, loading }
}

export async function signInWithEmailPassword(email, password) {
  const { auth } = await getFirebase()
  await signInWithEmailAndPassword(auth, email, password)
}

export async function signOutUser() {
  const { auth } = await getFirebase()
  await signOut(auth)
}


