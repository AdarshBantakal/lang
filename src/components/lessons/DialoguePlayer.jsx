import Button from '../ui/Button';

export default function DialoguePlayer({ dialogue }) {
  if (!dialogue || dialogue.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-3">Dialogue Practice</h3>
      <div className="space-y-4">
        {dialogue.map((line, idx) => (
          <div key={idx} className={`p-3 rounded-lg max-w-[80%] ${line.speaker === 'User' ? 'bg-indigo-100 ml-auto' : 'bg-gray-100'}`}>
            <span className="text-xs text-gray-500 block mb-1">{line.speaker}</span>
            <p>{line.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
