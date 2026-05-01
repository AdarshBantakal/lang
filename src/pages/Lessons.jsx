import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import LessonCard from "../components/lessons/LessonCard";

export default function Lessons() {
  const lessons = useQuery(api.lessons.list);

  if (!lessons) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#6b7280', fontSize: '16px' }}>Loading lessons...</p>
    </div>
  );

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>All Lessons</h1>
      <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 28px' }}>{lessons.length} lesson{lessons.length !== 1 ? 's' : ''} available</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        alignItems: 'stretch',
      }}>
        {lessons.map((lesson) => (
          <LessonCard key={lesson._id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
