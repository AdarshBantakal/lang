import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import LessonCard from "../components/lessons/LessonCard";
import XpCounter from "../components/gamification/XpCounter";
import StreakBadge from "../components/gamification/StreakBadge";

export default function Dashboard() {
  const userId = localStorage.getItem("userId");
  const lessons = useQuery(api.lessons.list);
  const user = useQuery(api.users.get, userId ? { userId } : "skip");

  if (!lessons || !user) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(46,204,113,0.3)', borderTop: '3px solid #2ecc71', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#6b7280', fontSize: '15px' }}>Loading your dashboard...</p>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Welcome Banner */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px', padding: '28px 32px',
        marginBottom: '36px', position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(46,204,113,0.12)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', position: 'relative', zIndex: 1 }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
              Welcome back, <span style={{ color: '#2ecc71' }}>{user.name}</span>! 👋
            </h1>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
              Ready to learn {lessons[0]?.language || 'a new language'}?
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <StreakBadge streakDays={user.streak || 0} />
            <XpCounter xp={user.totalXp || 0} />
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 4px' }}>
          Recommended for you
        </p>
        <div style={{ width: '32px', height: '2px', background: '#2ecc71', borderRadius: '2px' }} />
      </div>

      {/* Lesson Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        alignItems: 'stretch',
      }}>
        {lessons.slice(0, 3).map((lesson) => (
          <LessonCard key={lesson._id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}