import { useState, useEffect } from 'react'
import api from '../../services/api'
import ListingCard from '../../components/common/ListingCard'
import Spinner from '../../components/common/Spinner'

const Home = () => {
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
      <div style={{ marginBottom: '24px' }}>
        <h2>Available Properties</h2>
        <p style={{ color: 'var(--text-muted)' }}>Explore the latest listings matching your search criteria.</p>
      </div>
      
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '24px' 
        }}>
          {listings.map((listing) => (
            <ListingCard key={listing.listing_id} listing={listing} basePath="/buyer/listings" />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home