import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const CreateListing = () => {
  const navigate = useNavigate()
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/listings', formData)
      navigate('/agent/listings')
    } catch (err) {
      console.error('Failed to create listing', err)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2>Create New Listing</h2>
        <p style={{ color: 'var(--text-muted)' }}>Fill in the details below to publish a new property to the market.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <Input label="Listing Title" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Luxury Family Home in Suburbs" />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '0.4rem' }}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Describe the property features, location, and highlights..."
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
          <Button type="submit">Publish Listing</Button>
        </div>
      </form>
    </div>
  )
}

export default CreateListing
