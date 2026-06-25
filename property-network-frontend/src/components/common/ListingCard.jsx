import { Link } from 'react-router-dom';
import { getPropertyImage } from '../../utils/helpers';
import styles from './ListingCard.module.css';

const ListingCard = ({ listing, basePath = '/buyer/listings' }) => {
  const imageUrl = getPropertyImage(listing);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.card}>
      <Link to={`${basePath}/${listing.listing_id}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt={listing.title} className={styles.image} />
          <div className={styles.statusBadge}>{listing.status}</div>
          <div className={styles.typeBadge}>{listing.property_type}</div>
        </div>
      </Link>
      
      <div className={styles.content}>
        <div className={styles.priceRow}>
          <h3 className={styles.price}>{formatPrice(listing.price)}</h3>
        </div>
        
        <Link to={`${basePath}/${listing.listing_id}`} className={styles.titleLink}>
          <h4 className={styles.title}>{listing.title}</h4>
        </Link>
        
        <p className={styles.address}>
          {listing.address}, {listing.city}, {listing.state} {listing.zip_code}
        </p>
        
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureValue}>{listing.bedrooms || '-'}</span>
            <span className={styles.featureLabel}>Beds</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureValue}>{listing.bathrooms || '-'}</span>
            <span className={styles.featureLabel}>Baths</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureValue}>{listing.square_feet ? `${listing.square_feet} sqft` : '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
