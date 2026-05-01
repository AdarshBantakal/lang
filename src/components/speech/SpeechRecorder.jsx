import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
/*import convex from "../../lib/convex"; */  
import PronunciationFeedback from "./PronunciationFeedback";
import WaveformVisualizer from "./WaveformVisualizer";

export default function SpeechRecorder({ phrase, language, userId, lessonId }) {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [processing, setProcessing] = useState(false);

  const generateUploadUrl = useMutation(api.speech.generateUploadUrl);
  const saveAssessment = useMutation(api.speech.saveAssessment);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    chunksRef.current = [];
    mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stop = () => {
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    setRecording(false);
  };

const submit = async () => {
  if (!audioBlob) return;
  setProcessing(true);

  try {
    // 1. Convert audioBlob to base64
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        // Remove the prefix "data:audio/webm;base64,"
        const base64data = reader.result.split(',')[1];
        resolve(base64data);
      };
      reader.onerror = reject;
    });

    console.log("1. Audio base64 length:", base64.length);

    // 2. Upload to Convex storage (still needed for record keeping)
    const uploadUrl = await generateUploadUrl();
    const uploadResult = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": audioBlob.type },
      body: audioBlob,
    });
    const { storageId } = await uploadResult.json();
    console.log("2. Storage ID:", storageId);

    // 3. Call Flask with base64 audio
    console.log("3. Sending to Flask...");
    const flaskResponse = await fetch("http://localhost:5000/assess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        audio_base64: base64,
        phrase: phrase,
        language: language,
      }),
    });
    console.log("4. Flask response status:", flaskResponse.status);

    if (!flaskResponse.ok) {
      const errorText = await flaskResponse.text();
      throw new Error(`Flask error: ${flaskResponse.status} - ${errorText}`);
    }

    const assessment = await flaskResponse.json();
    console.log("5. Flask assessment:", assessment);

    // 4. Save result to Convex
    console.log("6. Saving assessment...");
    const { xpEarned } = await saveAssessment({
      userId,
      lessonId,
      transcription: assessment.transcription,
      accuracy: assessment.accuracy,
      audioStorageId: storageId,
    });
    console.log("7. XP earned:", xpEarned);

    setFeedback({ ...assessment, xpEarned });
    console.log("8. Success!");
  } catch (err) {
    console.error("FAILED:", err);
    alert(`Failed to analyze audio.\n${err.message}`);
  } finally {
    setProcessing(false);
  }
};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
        <p style={{ color: '#9ca3af', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px', fontWeight: '600' }}>
          Say this phrase aloud:
        </p>
        <p style={{ color: '#fff', fontSize: '24px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
          {phrase}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {!recording ? (
          <button 
            onClick={start} 
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '16px 32px', background: 'rgba(46,204,113,0.15)',
              border: '1px solid rgba(46,204,113,0.4)', borderRadius: '999px',
              color: '#2ecc71', fontSize: '16px', fontWeight: '700',
              cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 8px 24px rgba(46,204,113,0.15)'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(46,204,113,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(46,204,113,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#2ecc71', boxShadow: '0 0 10px #2ecc71' }} />
            Start Recording
          </button>
        ) : (
          <button 
            onClick={stop} 
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '16px 32px', background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.4)', borderRadius: '999px',
              color: '#ef4444', fontSize: '16px', fontWeight: '700',
              cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 8px 24px rgba(239,68,68,0.15)'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#ef4444', boxShadow: '0 0 10px #ef4444' }} />
            Stop Recording <WaveformVisualizer isRecording={recording} />
          </button>
        )}
      </div>

      {audioBlob && (
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <audio src={URL.createObjectURL(audioBlob)} controls style={{ width: '100%', height: '44px', marginBottom: '20px', borderRadius: '8px' }} />
          <button
            onClick={submit}
            disabled={processing}
            style={{
              width: '100%', padding: '16px', background: processing ? 'rgba(46,204,113,0.5)' : '#2ecc71',
              border: 'none', borderRadius: '12px', color: '#000',
              fontWeight: '800', fontSize: '16px', cursor: processing ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => { if(!processing) e.currentTarget.style.background = '#27ae60'; }}
            onMouseLeave={e => { if(!processing) e.currentTarget.style.background = '#2ecc71'; }}
          >
            {processing ? "✨ Analyzing Pronunciation..." : "Check Pronunciation →"}
          </button>
        </div>
      )}
      
      {feedback && <div style={{ marginTop: '16px' }}><PronunciationFeedback feedback={feedback} /></div>}
    </div>
  );
}