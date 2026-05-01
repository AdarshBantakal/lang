export default function VocabularyList({ words }) {
  if (!words || words.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-3">Vocabulary</h3>
      <ul className="space-y-2">
        {words.map((word, idx) => (
          <li key={idx} className="flex justify-between bg-gray-50 p-2 rounded">
            <span className="font-semibold">{word.original}</span>
            <span className="text-gray-600">{word.translation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
