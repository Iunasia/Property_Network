import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import styles from './Navbar.module.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <Link to="/">Property Network</Link>
        </div>
        
        {/* Main Public Navigation Links (Always visible) */}
        <div className={styles.primaryLinks}>
          <Link to="/">Buy</Link>
          <Link to="/">Rent</Link>
          <Link to="/">Sold</Link>
          <Link to="/">Find Agents</Link>
        </div>
      </div>

      <div className={styles.rightSection}>
        {/* Role-based Links */}
        {user?.role === 'buyer' && (
          <>
            <Link to="/buyer" className={styles.navButton}>Dashboard</Link>
            <Link to="/buyer/saved" className={styles.navButton}>Saved</Link>
          </>
        )}
        {user?.role === 'agent' && (
          <Link to="/agent" className={styles.navButton}>Agent Dashboard</Link>
        )}
        {user?.role === 'admin' && (
          <Link to="/admin" className={styles.navButton}>Admin Panel</Link>
        )}

        {/* Auth Actions */}
        {user ? (
          <button onClick={handleLogout} className={styles.navButton}>Sign out</button>
        ) : (
          <>
            <Link to="/login" className={styles.navButton}>Sign in</Link>
            <Link to="/register" className={styles.joinButton}>Join</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar