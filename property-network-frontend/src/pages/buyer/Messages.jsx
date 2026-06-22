const Messages = () => { 
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2>Messages</h2>
        <p style={{ color: 'var(--text-muted)' }}>Communicate directly with agents regarding your inquiries.</p>
      </div>
      <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--text-muted)', margin: 0 }}>Your inbox is empty</h3>
      </div>
    </div>
  )
}
export default Messages
