import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import styles from './PublicHome.module.css'

const PublicHome = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('buy')

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

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.searchContainer}>
          <div className={styles.searchTabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'buy' ? styles.active : ''}`}
              onClick={() => setActiveTab('buy')}
            >
              Buy
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'rent' ? styles.active : ''}`}
              onClick={() => setActiveTab('rent')}
            >
              Rent
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'sold' ? styles.active : ''}`}
              onClick={() => setActiveTab('sold')}
            >
              Sold
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'address' ? styles.active : ''}`}
              onClick={() => setActiveTab('address')}
            >
              Address
            </button>
          </div>
          
          <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Search by suburb, postcode or region" 
            />
            <button type="submit" className={`btn-primary ${styles.searchBtn}`}>
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Listings Section */}
      <section className={styles.listingsSection}>
        <h2 className={styles.sectionTitle}>Featured Properties</h2>
        
        {loading ? (
          <p>Loading properties...</p>
        ) : (
          <div className={styles.grid}>
            {listings.map((listing) => (
              <Link to={listing.status === 'available' ? `/buyer/listings/${listing.listing_id}` : '#'} key={listing.listing_id} className={styles.listingCard}>
                <div 
                  className={styles.cardImage}
                  style={{
                    backgroundImage: listing.ListingPhotos && listing.ListingPhotos.length > 0
                      ? `url(${listing.ListingPhotos[0].photo_path})`
                      : 'url(/hero_house.png)' // fallback
                  }}
                ></div>
                <div className={styles.cardContent}>
                  <span className={styles.badge}>{listing.status}</span>
                  <p className={styles.price}>${Number(listing.price).toLocaleString()}</p>
                  <p className={styles.address}>{listing.address || 'Address on request'}, {listing.city}</p>
                  <div className={styles.details}>
                    <span>{listing.property_type}</span>
                  </div>
                </div>
              </Link>
            ))}
            
            {listings.length === 0 && <p>No properties found.</p>}
          </div>
        )}
      </section>
    </div>
  )
}

export default PublicHome
