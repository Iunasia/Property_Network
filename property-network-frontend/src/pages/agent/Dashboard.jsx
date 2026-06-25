import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'
import Spinner from '../../components/common/Spinner'
import Button from '../../components/common/Button'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({ totalListings: 0, activeListings: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/agents/listings')
        const listings = res.data.data
        const active = listings.filter(l => l.status === 'available').length
        setStats({ totalListings: listings.length, activeListings: active })
      } catch (err) {
        console.error('Failed to fetch agent listings', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  if (loading) return <Spinner />

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Welcome back, {user?.full_name}</h2>
          <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your properties today.</p>
        </div>
        <Link to="/agent/listings/create">
          <Button>+ Create New Listing</Button>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-muted)' }}>Total Listings</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-h)' }}>{stats.totalListings}</div>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-muted)' }}>Active Listings</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.activeListings}</div>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-muted)' }}>Unread Messages</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-h)' }}>0</div>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-muted)' }}>Appointments</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-h)' }}>0</div>
        </div>
      </div>
      
      <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Quick Actions</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Need to update a property or respond to a client?</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/agent/listings"><Button variant="outline">Manage Listings</Button></Link>
          <Link to="/agent/messages"><Button variant="outline">View Messages</Button></Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
