import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'

const ListingDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [listing, setListing] = useState(null)
  const [questions, setQuestions] = useState([])
  const [newQuestion, setNewQuestion] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`)
        setListing(res.data.data)
      } catch (err) {
        console.error('Failed to fetch listing', err)
      }
    }

    const fetchQuestions = async () => {
      try {
        const res = await api.get(`/qa/listing/${id}`)
        setQuestions(res.data.data)
      } catch (err) {
        console.error('Failed to fetch questions', err)
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
    fetchQuestions()
  }, [id])

  const handlePostQuestion = async (e) => {
    e.preventDefault()
    try {
      await api.post('/qa', {
        body: newQuestion,
        listing_id: parseInt(id),
        is_anonymous: isAnonymous,
      })
      setNewQuestion('')
      const res = await api.get(`/qa/listing/${id}`)
      setQuestions(res.data.data)
    } catch (err) {
      console.error('Failed to post question', err)
    }
  }

  if (loading) return <p>Loading...</p>
  if (!listing) return <p>Listing not found</p>

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Listing Info */}
      <h2>{listing.title}</h2>
      <p>{listing.city} — {listing.address}</p>
      <p>Type: {listing.property_type}</p>
      <p>Price: ${listing.price}</p>
      <p>Status: {listing.status}</p>
      <p>{listing.description}</p>

      {/* Agent Info */}
      {listing.Agent && (
        <div style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h4>Agent</h4>
          <p>{listing.Agent.full_name}</p>
          <p>{listing.Agent.agency_name}</p>
          <p>{listing.Agent.phone}</p>
        </div>
      )}

      {/* Listing Details */}
      {listing.ListingDetails && listing.ListingDetails.length > 0 && (
        <div style={{ margin: '20px 0' }}>
          <h4>Details</h4>
          {listing.ListingDetails.map((detail) => (
            <p key={detail.detail_id}>{detail.feature_name}: {detail.feature_value}</p>
          ))}
        </div>
      )}

      {/* Q&A Section */}
      <div style={{ marginTop: '40px' }}>
        <h3>Community Q&A</h3>

        {/* Post Question Form */}
        <form onSubmit={handlePostQuestion} style={{ marginBottom: '20px' }}>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask a question about this listing..."
            rows={3}
            style={{ width: '100%', padding: '10px' }}
            required
          />
          <div>
            <label>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              Ask anonymously
            </label>
          </div>
          <button type="submit" style={{ marginTop: '10px' }}>Post Question</button>
        </form>

        {/* Questions List */}
        {questions.length === 0 ? (
          <p>No questions yet. Be the first to ask!</p>
        ) : (
          questions.map((q) => (
            <div key={q.question_id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
              <p><strong>{q.is_anonymous ? 'Anonymous' : q.Buyer?.full_name}</strong></p>
              <p>{q.body}</p>
              {q.tag && <p>Tag: {q.tag}</p>}

              {/* Answers */}
              {q.QaAnswers && q.QaAnswers.length > 0 && (
                <div style={{ marginTop: '10px', paddingLeft: '20px', borderLeft: '3px solid #666' }}>
                  {q.QaAnswers.map((a) => (
                    <div key={a.answer_id}>
                      <p><strong>{a.Agent?.full_name} ({a.Agent?.agency_name})</strong></p>
                      <p>{a.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ListingDetail