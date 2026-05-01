import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const MEDALS = ['🥇', '🥈', '🥉'];
const MEDAL_COLORS = ['#f59e0b', '#9ca3af', '#cd7c2f'];

export default function Leaderboard() {
  const users = useQuery(api.users.getLeaderboard) || [];

  return (
    <div style={{ padding: '32px', maxWidth: '720px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>Leaderboard</h1>
      <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 28px' }}>Top learners ranked by XP earned</p>

      <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        {users.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '48px 0' }}>No users yet. Be the first!</p>
        ) : users.map((user, index) => (
          <div key={user._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: index < users.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: index < 3 ? '22px' : '16px', fontWeight: '700', color: MEDAL_COLORS[index] || '#6b7280', width: '32px', textAlign: 'center' }}>
                {index < 3 ? MEDALS[index] : `#${index + 1}`}
              </span>
              <span style={{ fontWeight: '600', color: '#e5e7eb', fontSize: '15px' }}>{user.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {user.streak > 0 && (
                <span style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.2)', color: '#fb923c', fontSize: '12px', padding: '3px 10px', borderRadius: '999px', fontWeight: '600' }}>
                  🔥 {user.streak}
                </span>
              )}
              <span style={{ fontWeight: '700', color: '#2ecc71', fontSize: '15px' }}>{user.totalXp || 0} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
