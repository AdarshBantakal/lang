import Badge from '../ui/Badge';

export default function XpCounter({ xp }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-yellow-500 font-bold text-lg">⭐</span>
      <span className="font-semibold">{xp} XP</span>
    </div>
  );
}
