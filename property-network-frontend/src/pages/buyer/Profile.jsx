import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/common/Button'

const Profile = () => { 
  const { user } = useAuth()

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2>My Profile</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage your account settings and preferences.</p>
      </div>
      <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)', maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
            {user?.full_name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px 0' }}>{user?.full_name}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>{user?.email}</p>
            <span style={{ display: 'inline-block', marginTop: '8px', padding: '4px 8px', background: '#eef1f5', borderRadius: '4px', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
              {user?.role} Account
            </span>
          </div>
        </div>
        
        <Button variant="outline">Edit Profile</Button>
      </div>
    </div>
  )
}
export default Profile
