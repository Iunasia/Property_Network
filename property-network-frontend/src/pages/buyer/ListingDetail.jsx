import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { getPropertyImage } from '../../utils/helpers';
import styles from './ListingDetail.module.css';

const ListingDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        setListing(res.data.data);
      } catch (err) {
        console.error('Failed to fetch listing', err);
      }
    };

    const fetchQuestions = async () => {
      try {
        const res = await api.get(`/qa/listing/${id}`);
        setQuestions(res.data.data);
      } catch (err) {
        console.error('Failed to fetch questions', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
    fetchQuestions();
  }, [id]);

  const handlePostQuestion = async (e) => {
    e.preventDefault();
    try {
      await api.post('/qa', {
        body: newQuestion,
        listing_id: parseInt(id),
        is_anonymous: isAnonymous,
      });
      setNewQuestion('');
      const res = await api.get(`/qa/listing/${id}`);
      setQuestions(res.data.data);
    } catch (err) {
      console.error('Failed to post question', err);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) return <Spinner />;
  if (!listing) return <div className={styles.container}><p>Listing not found</p></div>;

  const heroImage = getPropertyImage(listing);

  return (
    <div className={styles.page}>
      {/* Hero Image Section */}
      <div className={styles.heroSection}>
        <img src={heroImage} alt={listing.title} className={styles.heroImage} />
        <div className={styles.heroOverlay}>
          <div className={styles.statusBadge}>{listing.status}</div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.mainContent}>
          {/* Header Info */}
          <div className={styles.header}>
            <h1 className={styles.title}>{listing.title}</h1>
            <p className={styles.address}>{listing.address}, {listing.city}, {listing.state} {listing.zip_code}</p>
            <h2 className={styles.price}>{formatPrice(listing.price)}</h2>
            
            <div className={styles.featuresRow}>
              <div className={styles.featureItem}>
                <span className={styles.featureValue}>{listing.bedrooms || '-'}</span>
                <span className={styles.featureLabel}>Beds</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureValue}>{listing.bathrooms || '-'}</span>
                <span className={styles.featureLabel}>Baths</span>
              </div>
              {listing.square_feet && (
                <div className={styles.featureItem}>
                  <span className={styles.featureValue}>{listing.square_feet}</span>
                  <span className={styles.featureLabel}>SqFt</span>
                </div>
              )}
              <div className={styles.featureItem}>
                <span className={styles.featureValue}>{listing.property_type}</span>
                <span className={styles.featureLabel}>Type</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <section className={styles.section}>
            <h3>Property Description</h3>
            <p className={styles.description}>{listing.description}</p>
          </section>

          {/* Details */}
          {listing.ListingDetails && listing.ListingDetails.length > 0 && (
            <section className={styles.section}>
              <h3>Property Details</h3>
              <div className={styles.detailsGrid}>
                {listing.ListingDetails.map((detail) => (
                  <div key={detail.detail_id} className={styles.detailItem}>
                    <span className={styles.detailLabel}>{detail.feature_name}</span>
                    <span className={styles.detailValue}>{detail.feature_value}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Q&A Section */}
          <section className={styles.section}>
            <h3>Community Q&A</h3>
            <form onSubmit={handlePostQuestion} className={styles.qaForm}>
              <div className={styles.inputGroup}>
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Ask a question about this listing..."
                  className={styles.textarea}
                  rows={3}
                  required
                />
              </div>
              <div className={styles.formFooter}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  />
                  Ask anonymously
                </label>
                <Button type="submit">Post Question</Button>
              </div>
            </form>

            <div className={styles.qaList}>
              {questions.length === 0 ? (
                <p className={styles.emptyText}>No questions yet. Be the first to ask!</p>
              ) : (
                questions.map((q) => (
                  <div key={q.question_id} className={styles.qaItem}>
                    <div className={styles.questionHeader}>
                      <strong>{q.is_anonymous ? 'Anonymous' : q.Buyer?.full_name}</strong>
                      {q.tag && <span className={styles.tagBadge}>{q.tag}</span>}
                    </div>
                    <p className={styles.questionBody}>{q.body}</p>

                    {q.QaAnswers && q.QaAnswers.length > 0 && (
                      <div className={styles.answersContainer}>
                        {q.QaAnswers.map((a) => (
                          <div key={a.answer_id} className={styles.answerItem}>
                            <strong>{a.Agent?.full_name} ({a.Agent?.agency_name})</strong>
                            <p>{a.body}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Sidebar / Agent Info */}
        <aside className={styles.sidebar}>
          {listing.Agent ? (
            <div className={styles.agentCard}>
              <h3>Contact Agent</h3>
              <div className={styles.agentInfo}>
                <div className={styles.agentAvatar}>
                  {listing.Agent.full_name.charAt(0)}
                </div>
                <div>
                  <h4 className={styles.agentName}>{listing.Agent.full_name}</h4>
                  <p className={styles.agentAgency}>{listing.Agent.agency_name}</p>
                </div>
              </div>
              <div className={styles.agentContact}>
                <p>📞 {listing.Agent.phone}</p>
              </div>
              <Button className={styles.fullWidthBtn}>Enquire Now</Button>
            </div>
          ) : (
            <div className={styles.agentCard}>
              <h3>No Agent Assigned</h3>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ListingDetail;