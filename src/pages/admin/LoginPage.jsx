import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Layout/Header.jsx';
import { Footer } from '../../components/Layout/Footer.jsx';
import './LoginPage.css';

// Firebase imports
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle login submit
  async function onSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in user:', userCredential.user);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <>
      <Header /> {/* Navbar */}
      <div className="admin-page">
        <section className="container" style={{ maxWidth: 420, margin: '80px auto 0 auto' }}>
          <h1>Admin Login</h1>
          <form onSubmit={onSubmit} className="form">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {error && <p className="error">{error}</p>}
            <button type="submit">Sign In</button>
          </form>
        </section>
      </div>
      <Footer /> {/* Footer */}
    </>
  );
}
