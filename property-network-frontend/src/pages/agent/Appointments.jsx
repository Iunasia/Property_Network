const Appointments = () => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2>Appointments</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage your property viewings and client meetings.</p>
      </div>
      <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--text-muted)', margin: 0 }}>No upcoming appointments</h3>
        <p style={{ color: 'var(--text-muted)' }}>When a buyer requests an inspection, it will appear here.</p>
      </div>
    </div>
  )
}
export default Appointments
