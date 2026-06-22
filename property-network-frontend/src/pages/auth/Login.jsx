import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import authService from '../../services/authService'
import styles from './Auth.module.css'

const Login = () => {
  const [role, setRole] = useState('buyer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await authService.login(role, { email, password })
      login(res.data.token)
      if (role === 'buyer') navigate('/buyer')
      else if (role === 'agent') navigate('/agent')
      else if (role === 'admin') navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className={styles.authPage}>
      <Link to="/" className={styles.backHome}>← Back to Property Network</Link>
      <div className={styles.overlay}></div>
      <div className={`glass-panel ${styles.authContainer}`}>
        <h2 className={styles.authTitle}>Welcome Back</h2>
        <p className={styles.authSubtitle}>Sign in to your account</p>
        
        {error && <p style={{ color: '#e53e3e', marginBottom: '1rem', fontWeight: 600 }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>I am a</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="buyer">Buyer</option>
              <option value="agent">Real Estate Agent</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className={`btn-primary ${styles.authSubmitBtn}`}>
            Sign In
          </button>
        </form>
        <p className={styles.authLinks}>
          Don't have an account? <Link to="/register">Create one here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login