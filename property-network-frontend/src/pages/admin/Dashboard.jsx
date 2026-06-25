import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'
import Spinner from '../../components/common/Spinner'
import Button from '../../components/common/Button'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({ users: 0, properties: 0, reports: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mocking an admin stats fetch
    const fetchAdminData = async () => {
      try {
        const [buyersRes, agentsRes, propertiesRes] = await Promise.all([
          api.get('/admin/buyers').catch(() => ({ data: { data: [] } })),
          api.get('/admin/agents').catch(() => ({ data: { data: [] } })),
          api.get('/listings').catch(() => ({ data: { data: [] } }))
        ])
        
        const totalUsers = (buyersRes.data?.data?.length || 0) + (agentsRes.data?.data?.length || 0)
        
        setStats({
          users: totalUsers,
          properties: propertiesRes.data?.data?.length || 0,
          reports: 0
        })
      } catch (err) {
        console.error('Failed to fetch admin stats', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAdminData()
  }, [])

  if (loading) return <Spinner />

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Admin Control Panel</h2>
          <p style={{ color: 'var(--text-muted)' }}>Overview of platform activity and metrics.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-muted)' }}>Total Users</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.users}</div>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-muted)' }}>Active Properties</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-h)' }}>{stats.properties}</div>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-muted)' }}>Pending Reports</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#e02424' }}>{stats.reports}</div>
        </div>
      </div>
      
      <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>System Management</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Review flagged users or moderate listings.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/admin/users"><Button variant="outline">Manage Users</Button></Link>
          <Link to="/admin/listings"><Button variant="outline">Moderate Listings</Button></Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
