import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const Home = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Listings</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {listings.map((listing) => (
          <div key={listing.listing_id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{listing.title}</h3>
            <p>{listing.city}</p>
            <p>{listing.property_type}</p>
            <p>${listing.price}</p>
            <p>Status: {listing.status}</p>
            <button onClick={() => navigate(`/buyer/listings/${listing.listing_id}`)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home