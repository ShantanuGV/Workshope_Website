import { useState } from 'react'
import { signInWithEmailPassword } from '../../services/auth.js'
import { useNavigate } from 'react-router-dom'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await signInWithEmailPassword(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <section className="container" style={{ maxWidth: 420 }}>
      <h2>Admin Login</h2>
      <form onSubmit={onSubmit} className="form">
        <label>Email<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required /></label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </section>
  )
}


