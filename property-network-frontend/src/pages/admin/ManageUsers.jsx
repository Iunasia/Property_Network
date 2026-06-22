import { useState, useEffect } from 'react'
import api from '../../services/api'
import Spinner from '../../components/common/Spinner'
import Button from '../../components/common/Button'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users')
        setUsers(res.data.data)
      } catch (err) {
        console.error('Failed to fetch users', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) return <Spinner />

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2>User Management</h2>
        <p style={{ color: 'var(--text-muted)' }}>View and manage registered accounts across the platform.</p>
      </div>

      <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Name</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Email</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Role</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No users found</td>
              </tr>
            ) : (
              users.map(u => (
                <tr key={u.user_id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500, color: 'var(--text-h)' }}>{u.full_name}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text)' }}>{u.email}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: u.role === 'admin' ? '#ffeef0' : u.role === 'agent' ? '#e0f2fe' : '#f1f5f9', color: u.role === 'admin' ? '#e02424' : u.role === 'agent' ? '#0369a1' : '#475569', textTransform: 'uppercase' }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <Button variant="outline" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>Edit</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUsers
