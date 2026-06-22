import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Spinner from '../../components/common/Spinner'

const EditListing = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'house',
    status: 'available',
    price: '',
    bedrooms: '',
    bathrooms: '',
    square_feet: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
  })

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`)
        const data = res.data.data
        setFormData({
          title: data.title || '',
          description: data.description || '',
          property_type: data.property_type || 'house',
          status: data.status || 'available',
          price: data.price || '',
          bedrooms: data.bedrooms || '',
          bathrooms: data.bathrooms || '',
          square_feet: data.square_feet || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          zip_code: data.zip_code || '',
        })
      } catch (err) {
        console.error('Failed to fetch listing', err)
      } finally {
        setLoading(false)
      }
    }
    fetchListing()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/listings/${id}`, formData)
      navigate('/agent/listings')
    } catch (err) {
      console.error('Failed to update listing', err)
    }
  }

  if (loading) return <Spinner />

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2>Edit Listing</h2>
        <p style={{ color: 'var(--text-muted)' }}>Update the details for this property.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <Input label="Listing Title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '0.4rem' }}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border)', fontFamily: 'inherit', fontSize: '1rem', boxSizing: 'border-box' }}
            />
          </div>

          <Input label="Price ($)" type="number" name="price" value={formData.price} onChange={handleChange} required />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>Property Type</label>
            <select name="property_type" value={formData.property_type} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '1rem' }}>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="land">Land</option>
            </select>
          </div>

          <Input label="Bedrooms" type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
          <Input label="Bathrooms" type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
          <Input label="Square Feet" type="number" name="square_feet" value={formData.square_feet} onChange={handleChange} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '1rem' }}>
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <Input label="Street Address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <Input label="City" name="city" value={formData.city} onChange={handleChange} required />
          <Input label="State" name="state" value={formData.state} onChange={handleChange} required />
          <Input label="ZIP Code" name="zip_code" value={formData.zip_code} onChange={handleChange} required />
        </div>

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          <Button variant="secondary" type="button" onClick={() => navigate('/agent/listings')}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  )
}

export default EditListing
