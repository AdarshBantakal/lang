import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const STEPS = ['motivation-killers','proudest-goal','dedicated-time','learning-for','master-situation','challenge','did-you-know','boost-success','all-done'];

function OptionCard({ label, selected, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: '12px 16px', borderRadius: '12px', border: selected ? '1px solid rgba(46,204,113,0.6)' : '1px solid rgba(255,255,255,0.1)', background: selected ? 'rgba(46,204,113,0.15)' : 'rgba(0,0,0,0.25)', color: selected ? '#2ecc71' : '#d1d5db', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
      {label}
    </button>
  );
}

function Toggle({ label, enabled, onToggle }) {
  return (
    <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
      <span style={{ color: '#d1d5db', fontSize: '14px' }}>{label}</span>
      <div style={{ width: '44px', height: '24px', borderRadius: '999px', background: enabled ? '#2ecc71' : 'rgba(255,255,255,0.1)', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: '4px', left: enabled ? '24px' : '4px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
      </div>
    </div>
  );
}

const greenBtn = { width: '100%', padding: '13px', background: '#2ecc71', border: 'none', borderRadius: '12px', color: '#000', fontWeight: '700', fontSize: '16px', cursor: 'pointer', marginTop: '8px' };
const ghostBtn = { width: '100%', padding: '13px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#9ca3af', fontWeight: '600', fontSize: '15px', cursor: 'pointer', marginTop: '8px' };

export default function Onboarding() {
  const navigate = useNavigate();
  const savePrefs = useMutation(api.preferences.saveOnboarding);
  const userId = localStorage.getItem('userId');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({
    motivationKillers: [], proudestGoal: '', dedicatedTime: '',
    learningFor: [], masterSituation: [], acceptChallenge: false,
    reminders: { dailyReminders: false, streakNotifications: false, weekendAlerts: false, progressCelebration: false },
  });

  const currentStep = STEPS[stepIndex];
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const goNext = () => {
    if (stepIndex < STEPS.length - 1) setStepIndex(s => s + 1);
    else savePrefs({ userId, preferences: JSON.stringify(answers), reminderTime: answers.dedicatedTime || undefined }).then(() => navigate('/dashboard'));
  };

  const toggleMulti = (field, value) => setAnswers(prev => ({ ...prev, [field]: prev[field].includes(value) ? prev[field].filter(v => v !== value) : [...prev[field], value] }));
  const toggleReminder = key => setAnswers(prev => ({ ...prev, reminders: { ...prev.reminders, [key]: !prev.reminders[key] } }));

  const isDisabled =
    (currentStep === 'motivation-killers' && answers.motivationKillers.length === 0) ||
    (currentStep === 'proudest-goal' && !answers.proudestGoal) ||
    (currentStep === 'dedicated-time' && !answers.dedicatedTime);

  const showContinue = !['challenge', 'all-done', 'did-you-know', 'boost-success'].includes(currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 'motivation-killers': return <>
        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: '0 0 6px' }}>What killed your motivation?</h2>
        <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 20px' }}>Select all that apply</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {['Boredom','No clear progression','Too busy','Lack of resources','Forgetfulness','No feedback','Other'].map(opt => <OptionCard key={opt} label={opt} selected={answers.motivationKillers.includes(opt)} onClick={() => toggleMulti('motivationKillers', opt)} />)}
        </div>
      </>;
      case 'proudest-goal': return <>
        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: '0 0 6px' }}>What would make you proudest?</h2>
        <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 20px' }}>Pick one goal</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {['Ordering food','Communicating with auto driver','Understanding TV shows','Chatting with locals','Traveling alone','Other'].map(opt => <OptionCard key={opt} label={opt} selected={answers.proudestGoal === opt} onClick={() => setAnswers(p => ({ ...p, proudestGoal: opt }))} />)}
        </div>
      </>;
      case 'dedicated-time': return <>
        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: '0 0 6px' }}>When can you practice?</h2>
        <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 20px' }}>We'll schedule reminders around this</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          {['Morning (6am–12pm)','Afternoon (12pm–6pm)','Evening (6pm–10pm)','Night (10pm–6am)'].map(opt => <OptionCard key={opt} label={opt} selected={answers.dedicatedTime === opt} onClick={() => setAnswers(p => ({ ...p, dedicatedTime: opt }))} />)}
        </div>
        {answers.dedicatedTime && <p style={{ color: '#2ecc71', fontSize: '13px', marginTop: '12px' }}>✅ Reminders set for <strong>{answers.dedicatedTime.split('(')[0].trim()}</strong></p>}
      </>;
      case 'learning-for': return <>
        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: '0 0 6px' }}>Who are you learning for?</h2>
        <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 20px' }}>Select all that apply</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {['Myself','Family','Friends','Work','Travel','Others'].map(opt => <OptionCard key={opt} label={opt} selected={answers.learningFor.includes(opt)} onClick={() => toggleMulti('learningFor', opt)} />)}
        </div>
      </>;
      case 'master-situation': return <>
        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: '0 0 6px' }}>Which situation to master?</h2>
        <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 20px' }}>Select all that apply</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {['Ordering at restaurant','Shopping','Asking for directions','Making friends','Work conversation','Travel situations','Others'].map(opt => <OptionCard key={opt} label={opt} selected={answers.masterSituation.includes(opt)} onClick={() => toggleMulti('masterSituation', opt)} />)}
        </div>
      </>;
      case 'challenge': return <>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏆</div>
          <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: '0 0 8px' }}>30-Day Challenge</h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Only 15% of users achieve this in their first month.</p>
        </div>
        <button style={greenBtn} onClick={() => { setAnswers(p => ({ ...p, acceptChallenge: true })); goNext(); }}>Accept Challenge 💪</button>
        <button style={ghostBtn} onClick={goNext}>Maybe Later</button>
      </>;
      case 'did-you-know': return <>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🧠</div>
          <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: '0 0 12px' }}>Did you know?</h2>
          <p style={{ color: '#d1d5db', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>Your brain forms new pathways after just <strong style={{ color: '#fff' }}>7 days</strong> of practice. Miss 2 days and they weaken. That's why streaks matter!</p>
        </div>
        <button style={greenBtn} onClick={goNext}>Got it, let's go!</button>
      </>;
      case 'boost-success': return <>
        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: '0 0 6px' }}>Boost your success by 40%</h2>
        <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 20px' }}>Enable smart reminders to stay on track</p>
        <div style={{ marginBottom: '20px' }}>
          <Toggle label="Daily reminders" enabled={answers.reminders.dailyReminders} onToggle={() => toggleReminder('dailyReminders')} />
          <Toggle label="Streak notifications" enabled={answers.reminders.streakNotifications} onToggle={() => toggleReminder('streakNotifications')} />
          <Toggle label="Weekend practice alerts" enabled={answers.reminders.weekendAlerts} onToggle={() => toggleReminder('weekendAlerts')} />
          <Toggle label="Progress celebrations" enabled={answers.reminders.progressCelebration} onToggle={() => toggleReminder('progressCelebration')} />
        </div>
        <button style={greenBtn} onClick={goNext}>Continue</button>
      </>;
      case 'all-done': return <>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '800', margin: '0 0 10px' }}>You're all set!</h2>
          <p style={{ color: '#9ca3af', fontSize: '15px', margin: '0 0 28px' }}>Your personalized learning plan is ready.</p>
          <button style={greenBtn} onClick={goNext}>Go to Dashboard →</button>
        </div>
      </>;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '520px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '36px', position: 'relative', overflow: 'hidden', boxShadow: '0 0 60px rgba(46,204,113,0.08), 0 25px 50px rgba(0,0,0,0.4)' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '180px', height: '180px', background: 'rgba(46,204,113,0.12)', borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Progress bar */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#6b7280', fontSize: '12px' }}>Step {stepIndex + 1} of {STEPS.length}</span>
              <span style={{ color: '#6b7280', fontSize: '12px' }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: '#2ecc71', borderRadius: '999px', width: `${progress}%`, transition: 'width 0.4s ease' }} />
            </div>
          </div>
          {renderStep()}
          {showContinue && (
            <button onClick={goNext} disabled={isDisabled} style={{ ...greenBtn, opacity: isDisabled ? 0.3 : 1, cursor: isDisabled ? 'not-allowed' : 'pointer', marginTop: '20px' }}>
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}