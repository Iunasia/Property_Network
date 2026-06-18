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
      <div className={styles.logo}>
        <Link to="/">Property Network</Link>
      </div>
      <div className={styles.links}>
        {user?.role === 'buyer' && (
          <>
            <Link to="/buyer">Home</Link>
            <Link to="/buyer/saved">Saved</Link>
            <Link to="/buyer/appointments">Appointments</Link>
            <Link to="/buyer/messages">Messages</Link>
            <Link to="/buyer/notifications">Notifications</Link>
            <Link to="/buyer/profile">Profile</Link>
          </>
        )}
        {user?.role === 'agent' && (
          <>
            <Link to="/agent">Dashboard</Link>
            <Link to="/agent/listings">Listings</Link>
            <Link to="/agent/appointments">Appointments</Link>
            <Link to="/agent/messages">Messages</Link>
            <Link to="/agent/profile">Profile</Link>
          </>
        )}
        {user?.role === 'admin' && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/listings">Listings</Link>
            <Link to="/admin/reports">Reports</Link>
          </>
        )}
        {user && (
          <button onClick={handleLogout}>Logout</button>
        )}
        {!user && (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar