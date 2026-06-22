import { useState, useEffect } from 'react'
import api from '../../services/api'
import Spinner from '../../components/common/Spinner'
import Button from '../../components/common/Button'

const ManageListings = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get('/listings')
        setListings(res.data.data)
      } catch (err) {
        console.error('Failed to fetch listings', err)
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  if (loading) return <Spinner />

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2>System Listings</h2>
        <p style={{ color: 'var(--text-muted)' }}>Moderate properties published on the platform.</p>
      </div>

      <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Title</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Location</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No listings found</td>
              </tr>
            ) : (
              listings.map(l => (
                <tr key={l.listing_id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500, color: 'var(--text-h)' }}>{l.title}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text)' }}>{l.city}, {l.state}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, background: '#e0f2fe', color: '#0369a1', textTransform: 'uppercase' }}>
                      {l.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <Button variant="outline" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>View</Button>
                    <Button variant="danger" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>Remove</Button>
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

export default ManageListings
