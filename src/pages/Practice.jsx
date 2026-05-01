import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import SpeechRecorder from "../components/speech/SpeechRecorder";

export default function Practice() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const lesson = useQuery(api.lessons.getById, { id });

  if (!lesson || !userId) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#6b7280' }}>Loading practice session...</p>
    </div>
  );

  return (
    <div style={{ padding: '32px', maxWidth: '680px', margin: '0 auto' }}>
      <span style={{ display: 'inline-block', background: 'rgba(46,204,113,0.12)', border: '1px solid rgba(46,204,113,0.25)', borderRadius: '999px', padding: '4px 14px', fontSize: '12px', color: '#2ecc71', fontWeight: '600', marginBottom: '16px' }}>
        {lesson.language}
      </span>
      <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>Practice: {lesson.title}</h1>
      <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 28px' }}>Listen, repeat, and get scored on your pronunciation.</p>
      <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '36px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '160px', height: '160px', background: 'rgba(46,204,113,0.1)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 24px', position: 'relative', zIndex: 1 }}>Pronunciation Challenge</p>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SpeechRecorder phrase={lesson.phrase} language={lesson.language} userId={userId} lessonId={lesson._id} />
        </div>
      </div>
    </div>
  );
}
