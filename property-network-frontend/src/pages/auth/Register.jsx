import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import authService from '../../services/authService'
import styles from './Auth.module.css'

const Register = () => {
  const [role, setRole] = useState('buyer')
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    agency_name: '',
  })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await authService.register(role, formData)
      login(res.data.token)
      if (role === 'buyer') navigate('/buyer')
      else if (role === 'agent') navigate('/agent')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className={styles.authPage}>
      <Link to="/" className={styles.backHome}>← Back to Property Network</Link>
      <div className={styles.overlay}></div>
      <div className={`glass-panel ${styles.authContainer}`}>
        <h2 className={styles.authTitle}>Join Us</h2>
        <p className={styles.authSubtitle}>Create your account today</p>
        
        {error && <p style={{ color: '#e53e3e', marginBottom: '1rem', fontWeight: 600 }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Register as</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="buyer">Buyer</option>
              <option value="agent">Real Estate Agent</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0412 345 678"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
            />
          </div>
          {role === 'agent' && (
            <div className={styles.formGroup}>
              <label>Agency Name</label>
              <input
                type="text"
                name="agency_name"
                value={formData.agency_name}
                onChange={handleChange}
                placeholder="E.g. Ray White"
              />
            </div>
          )}
          <button type="submit" className={`btn-primary ${styles.authSubmitBtn}`}>
            Create Account
          </button>
        </form>
        <p className={styles.authLinks}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register