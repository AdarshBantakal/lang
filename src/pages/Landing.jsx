import { Link } from 'react-router-dom';

const card = {
  width: '100%', maxWidth: '900px',
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '28px',
  padding: '64px 48px', position: 'relative', overflow: 'hidden',
  boxShadow: '0 0 80px rgba(46,204,113,0.1), 0 30px 60px rgba(0,0,0,0.4)',
  textAlign: 'center',
};
const btnPrimary = {
  display: 'inline-block', padding: '14px 36px',
  background: '#2ecc71', color: '#000', fontWeight: '700',
  fontSize: '17px', borderRadius: '12px', border: 'none',
  cursor: 'pointer', textDecoration: 'none', transition: 'background 0.2s',
};
const btnSecondary = {
  display: 'inline-block', padding: '14px 36px',
  background: 'rgba(255,255,255,0.08)', color: '#fff', fontWeight: '600',
  fontSize: '17px', borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.15)',
  cursor: 'pointer', textDecoration: 'none', transition: 'background 0.2s',
};

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={card}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '400px', height: '400px', background: 'rgba(46,204,113,0.15)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(46,204,113,0.12)', border: '1px solid rgba(46,204,113,0.25)', borderRadius: '999px', padding: '6px 16px', fontSize: '13px', color: '#2ecc71', fontWeight: '600', marginBottom: '24px', letterSpacing: '0.5px' }}>
            🌐 AI-Powered Language Learning
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: '900', color: '#fff', margin: '0 0 20px', letterSpacing: '-2px', lineHeight: 1.1 }}>
            Master Any <span style={{ color: '#2ecc71' }}>Language</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '560px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Learn practically with AI-powered speech recognition, gamified lessons, and personalized curriculums.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" style={btnPrimary}
              onMouseEnter={e => e.currentTarget.style.background = '#27ae60'}
              onMouseLeave={e => e.currentTarget.style.background = '#2ecc71'}>
              Get Started Free →
            </Link>
            <Link to="/login" style={btnSecondary}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
              Log In to Account
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '48px', flexWrap: 'wrap' }}>
            {[['🎯', 'Gamified Lessons'], ['🎤', 'Speech Recognition'], ['📊', 'Personalized Plan']].map(([icon, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
