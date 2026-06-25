const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/**
 * Resolves the image source URL for a listing.
 * If the listing has photos, it handles absolute URLs, local uploads,
 * and maps SQL seed names to high-quality Unsplash real estate photos.
 * Otherwise, it falls back to a category-specific placeholder.
 * 
 * @param {Object} listing - The listing data object
 * @param {number} index - Index of the photo to retrieve (default: 0)
 * @returns {string} - The resolved image URL
 */
export const getPropertyImage = (listing, index = 0) => {
  if (listing && listing.ListingPhotos && listing.ListingPhotos.length > index) {
    const photo = listing.ListingPhotos[index];
    const path = photo.photo_path || photo.photo_url || '';
    
    if (path.startsWith('http')) {
      return path;
    }
    
    // Map database seed file paths to gorgeous real estate images to make the demo look polished
    if (path.includes('listing1_main')) {
      return 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'; // BKK1 Condo
    }
    if (path.includes('listing1_bedroom')) {
      return 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'; // Bedroom
    }
    if (path.includes('listing2_main')) {
      return 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'; // Toul Kork Villa
    }
    if (path.includes('listing3_main')) {
      return 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'; // Sen Sok Flat
    }
    
    // If it's a relative backend upload (e.g. /uploads/image.png)
    if (path.startsWith('/uploads') || path.startsWith('uploads')) {
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `${BACKEND_URL}${cleanPath}`;
    }
    
    // If it starts with photos/ or any other relative path
    if (path) {
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `${BACKEND_URL}${cleanPath}`;
    }
  }

  // Fallbacks by property type
  const type = (listing?.property_type || '').toLowerCase();
  switch (type) {
    case 'villa':
      return 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80';
    case 'condo':
      return 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';
    case 'flat':
      return 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80';
    case 'apartment':
      return 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80';
    case 'house':
    default:
      return 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80';
  }
};
