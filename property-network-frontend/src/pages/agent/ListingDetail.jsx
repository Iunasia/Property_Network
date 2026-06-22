import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/api'
import Spinner from '../../components/common/Spinner'
import Button from '../../components/common/Button'

const ListingDetail = () => {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`)
        setListing(res.data.data)
      } catch (err) {
        console.error('Failed to fetch listing', err)
      } finally {
        setLoading(false)
      }
    }
    fetchListing()
  }, [id])

  if (loading) return <Spinner />
  if (!listing) return <p style={{ padding: '40px', textAlign: 'center' }}>Listing not found</p>

  const heroImage = listing.ListingPhotos && listing.ListingPhotos.length > 0 
    ? `http://localhost:5000${listing.ListingPhotos[0].photo_url}`
    : '/hero_house.png'

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Listing Preview</h2>
        <Link to={`/agent/listings/edit/${listing.listing_id}`}>
          <Button variant="secondary">Edit Listing</Button>
        </Link>
      </div>

      <div style={{ background: 'var(--bg-card)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ width: '100%', height: '400px', background: '#000', position: 'relative' }}>
          <img src={heroImage} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
          <div style={{ position: 'absolute', top: '24px', left: '24px', background: 'var(--primary)', color: 'white', padding: '6px 16px', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase' }}>
            {listing.status}
          </div>
        </div>
        
        <div style={{ padding: '32px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '2rem' }}>{listing.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0 0 16px 0' }}>{listing.address}, {listing.city}, {listing.state} {listing.zip_code}</p>
          <h2 style={{ fontSize: '2.2rem', margin: '0 0 24px 0', color: 'var(--text-h)' }}>${listing.price.toLocaleString()}</h2>
          
          <div style={{ display: 'flex', gap: '32px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '24px 0', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{listing.bedrooms || '-'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Beds</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{listing.bathrooms || '-'}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Baths</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{listing.property_type}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Type</div>
            </div>
          </div>

          <h3>Property Description</h3>
          <p style={{ lineHeight: 1.8, color: 'var(--text)' }}>{listing.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ListingDetail
