const ManageReports = () => {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2>Flagged Content & Reports</h2>
        <p style={{ color: 'var(--text-muted)' }}>Review content flagged by the community.</p>
      </div>
      <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', background: '#e0f2fe', color: '#0369a1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '2rem' }}>✓</div>
        <h3 style={{ color: 'var(--text-h)', margin: '0 0 8px 0' }}>All Caught Up</h3>
        <p style={{ color: 'var(--text-muted)' }}>There are no pending reports to review at this time.</p>
      </div>
    </div>
  )
}
export default ManageReports
