import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Spinner from '../../components/common/Spinner'
import Button from '../../components/common/Button'
import ListingCard from '../../components/common/ListingCard'

const ManageListings = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get('/agents/listings')
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
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Manage Listings</h2>
          <p style={{ color: 'var(--text-muted)' }}>View and edit your property portfolio.</p>
        </div>
        <Link to="/agent/listings/create">
          <Button>+ Create New</Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-muted)', margin: '0 0 16px 0' }}>You have no listings</h3>
          <Link to="/agent/listings/create">
            <Button>Create Your First Listing</Button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {listings.map((listing) => (
            <div key={listing.listing_id} style={{ position: 'relative' }}>
              <ListingCard listing={listing} basePath="/agent/listings" />
              <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, display: 'flex', gap: '8px' }}>
                <Link to={`/agent/listings/edit/${listing.listing_id}`}>
                  <Button variant="secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>Edit</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageListings
