export default function WaveformVisualizer({ isRecording }) {
  if (!isRecording) return null;
  
  return (
    <div className="flex items-center justify-center gap-1 h-8 mt-2">
      {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((val, i) => (
        <div 
          key={i} 
          className="bg-indigo-500 w-1 rounded-full animate-pulse"
          style={{ 
            height: `${val * 20}%`,
            animationDelay: `${i * 0.1}s` 
          }}
        />
      ))}
    </div>
  );
}
