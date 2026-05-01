import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Link, useNavigate } from 'react-router-dom';

const inputStyle = {
  width: '100%', padding: '12px 14px', boxSizing: 'border-box',
  background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', color: '#fff', fontSize: '15px', outline: 'none',
};

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useMutation(api.auth.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setIsLoading(true);
    try {
      const userId = await login({ name, password });
      localStorage.setItem('userId', userId);
      navigate('/dashboard');
    } catch (err) { setError(err.message); }
    finally { setIsLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '440px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px', position: 'relative', overflow: 'hidden', boxShadow: '0 0 60px rgba(46,204,113,0.08), 0 25px 50px rgba(0,0,0,0.4)' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '200px', height: '200px', background: 'rgba(46,204,113,0.15)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(46,204,113,0.15)', border: '1px solid rgba(46,204,113,0.3)', fontSize: '24px', marginBottom: '16px' }}>🌐</div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', margin: '0 0 8px', letterSpacing: '-0.5px' }}>Welcome Back</h2>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Sign in to continue your learning journey.</p>
          </div>
          {error && <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', color: '#f87171', fontSize: '14px', textAlign: 'center', marginBottom: '20px' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#d1d5db', marginBottom: '8px' }}>Username</label>
              <input style={inputStyle} placeholder="Enter your username" value={name} onChange={e => setName(e.target.value)} required
                onFocus={e => e.target.style.borderColor = '#2ecc71'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#d1d5db', marginBottom: '8px' }}>Password</label>
              <input type="password" style={inputStyle} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required
                onFocus={e => e.target.style.borderColor = '#2ecc71'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
            </div>
            <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '13px', background: isLoading ? 'rgba(46,204,113,0.5)' : '#2ecc71', border: 'none', borderRadius: '10px', color: '#000', fontWeight: '700', fontSize: '16px', cursor: isLoading ? 'not-allowed' : 'pointer' }}
              onMouseEnter={e => { if (!isLoading) e.target.style.background = '#27ae60'; }}
              onMouseLeave={e => { if (!isLoading) e.target.style.background = '#2ecc71'; }}>
              {isLoading ? 'Signing in...' : 'Log In'}
            </button>
          </form>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ color: '#6b7280', fontSize: '12px' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          </div>
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#9ca3af', margin: 0 }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#2ecc71', fontWeight: '600', textDecoration: 'none' }}>Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}