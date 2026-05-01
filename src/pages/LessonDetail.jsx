import { useParams, Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function LessonDetail() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const lesson = useQuery(api.lessons.getById, { id });

  if (!lesson || !userId) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#6b7280' }}>Loading...</p>
    </div>
  );

  return (
    <div style={{ padding: '32px', maxWidth: '680px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '180px', height: '180px', background: 'rgba(46,204,113,0.12)', borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-block', background: 'rgba(46,204,113,0.12)', border: '1px solid rgba(46,204,113,0.25)', borderRadius: '999px', padding: '4px 14px', fontSize: '12px', color: '#2ecc71', fontWeight: '600', marginBottom: '20px' }}>
            {lesson.language}
          </span>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', margin: '0 0 24px', letterSpacing: '-0.5px' }}>{lesson.title}</h1>
          <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px' }}>Lesson Phrase</p>
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px 24px', marginBottom: '32px' }}>
            <p style={{ color: '#e5e7eb', fontSize: '18px', margin: 0, lineHeight: 1.6 }}>{lesson.phrase}</p>
          </div>
          <Link to={`/practice/${lesson._id}`} style={{ display: 'block', width: '100%', padding: '14px', background: '#2ecc71', color: '#000', fontWeight: '700', fontSize: '16px', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}
            onMouseEnter={e => e.currentTarget.style.background = '#27ae60'}
            onMouseLeave={e => e.currentTarget.style.background = '#2ecc71'}>
            Start Practice Session →
          </Link>
        </div>
      </div>
    </div>
  );
}