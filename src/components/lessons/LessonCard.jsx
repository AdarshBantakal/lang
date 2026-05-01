import { Link } from 'react-router-dom';

const LEVEL_COLORS = {
  Beginner: { bg: 'rgba(46,204,113,0.12)', border: 'rgba(46,204,113,0.25)', text: '#2ecc71' },
  Intermediate: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.25)', text: '#60a5fa' },
  Advanced: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)', text: '#f87171' },
};

const LANG_ICONS = {
  kannada: '🇮🇳', hindi: '🇮🇳', spanish: '🇪🇸', french: '🇫🇷',
  german: '🇩🇪', japanese: '🇯🇵', chinese: '🇨🇳', default: '🌐',
};

export default function LessonCard({ lesson }) {
  const level = lesson.level || 'Beginner';
  const levelStyle = LEVEL_COLORS[level] || LEVEL_COLORS.Beginner;
  const langKey = lesson.language?.toLowerCase();
  const langIcon = LANG_ICONS[langKey] || LANG_ICONS.default;

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: '18px',
      padding: '24px',
      display: 'flex', flexDirection: 'column',
      gap: '0',
      position: 'relative', overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
      cursor: 'pointer',
      height: '100%', boxSizing: 'border-box',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(46,204,113,0.15)';
        e.currentTarget.style.borderColor = 'rgba(46,204,113,0.2)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
      }}
    >
      {/* Subtle glow top-right */}
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', background: 'rgba(46,204,113,0.08)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />

      {/* Top row: language icon + level badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px',
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
        }}>
          {langIcon}
        </div>
        <span style={{
          fontSize: '11px', fontWeight: '700', letterSpacing: '0.4px',
          padding: '4px 12px', borderRadius: '999px',
          background: levelStyle.bg, border: `1px solid ${levelStyle.border}`,
          color: levelStyle.text,
        }}>
          {level}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '17px', fontWeight: '700', color: '#fff',
        margin: '0 0 8px', letterSpacing: '-0.3px', lineHeight: 1.3,
      }}>
        {lesson.title}
      </h3>

      {/* Language label */}
      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 14px', fontWeight: '500', textTransform: 'capitalize' }}>
        {lesson.language}
      </p>

      {/* Phrase preview */}
      <div style={{
        background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '10px', padding: '12px 14px', marginBottom: '20px', flex: 1,
      }}>
        <p style={{
          fontSize: '13px', color: '#d1d5db', margin: 0, lineHeight: 1.6,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {lesson.phrase}
        </p>
      </div>

      {/* CTA */}
      <Link to={`/lesson/${lesson._id}`} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        padding: '10px 16px', borderRadius: '10px', textDecoration: 'none',
        background: 'rgba(46,204,113,0.12)', border: '1px solid rgba(46,204,113,0.25)',
        color: '#2ecc71', fontSize: '13px', fontWeight: '700',
        transition: 'background 0.15s',
        marginTop: 'auto',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(46,204,113,0.22)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(46,204,113,0.12)'}
      >
        Start Lesson <span style={{ fontSize: '15px' }}>→</span>
      </Link>
    </div>
  );
}
