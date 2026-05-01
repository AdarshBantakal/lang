import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const userId = localStorage.getItem("userId");
  const user = useQuery(api.users.get, userId ? { userId } : "skip");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  if (!user) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#6b7280' }}>Loading profile...</p>
    </div>
  );

  return (
    <div style={{ padding: '32px', maxWidth: '560px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#fff', margin: '0 0 28px', letterSpacing: '-0.5px' }}>Profile</h1>
      <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '36px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '180px', height: '180px', background: 'rgba(46,204,113,0.12)', borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(46,204,113,0.2)', border: '2px solid rgba(46,204,113,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '800', color: '#2ecc71' }}>
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p style={{ color: '#fff', fontWeight: '700', fontSize: '17px', margin: '0 0 3px' }}>{user.name}</p>
              <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>Language Learner</p>
            </div>
          </div>

          {/* Stats */}
          <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 16px' }}>Statistics</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px' }}>
            <div style={{ background: 'rgba(46,204,113,0.08)', border: '1px solid rgba(46,204,113,0.18)', borderRadius: '14px', padding: '20px' }}>
              <p style={{ color: '#6b7280', fontSize: '12px', margin: '0 0 8px' }}>Total XP</p>
              <p style={{ color: '#2ecc71', fontSize: '30px', fontWeight: '800', margin: 0, letterSpacing: '-1px' }}>{user.totalXp || 0}</p>
            </div>
            <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.18)', borderRadius: '14px', padding: '20px' }}>
              <p style={{ color: '#6b7280', fontSize: '12px', margin: '0 0 8px' }}>Streak</p>
              <p style={{ color: '#fb923c', fontSize: '30px', fontWeight: '800', margin: '0 0 2px', letterSpacing: '-1px' }}>🔥 {user.streak || 0}</p>
              <p style={{ color: '#6b7280', fontSize: '11px', margin: 0 }}>days</p>
            </div>
          </div>

          <button onClick={handleLogout} style={{ width: '100%', padding: '13px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '12px', color: '#f87171', fontWeight: '700', fontSize: '15px', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
