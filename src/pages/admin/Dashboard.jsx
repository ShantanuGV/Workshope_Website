import { signOutUser, useAuthState } from '../../services/auth.js'

export function AdminDashboard() {
  const { user } = useAuthState()
  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <button onClick={signOutUser}>Sign out</button>
      <p>Use the sidebar to manage content.</p>
    </div>
  )
}


