import { useState, useEffect } from 'react'
import api from '../../services/api'
import ListingCard from '../../components/common/ListingCard'
import Spinner from '../../components/common/Spinner'

const SavedListings = () => {
  const [savedListings, setSavedListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        // Fallback to fetch all if specific endpoint doesn't exist yet for demo
        const res = await api.get('/listings')
        // Let's pretend the first two are saved
        setSavedListings(res.data.data.slice(0, 2))
      } catch (err) {
        console.error('Failed to fetch saved listings', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSaved()
  }, [])

  if (loading) return <Spinner />

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2>Saved Properties</h2>
        <p style={{ color: 'var(--text-muted)' }}>Keep track of the homes you love.</p>
      </div>
      
      {savedListings.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--text-muted)' }}>You haven't saved any properties yet.</h3>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '24px' 
        }}>
          {savedListings.map((listing) => (
            <ListingCard key={listing.listing_id} listing={listing} basePath="/buyer/listings" />
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedListings
