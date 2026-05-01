export default function StreakBadge({ streakDays }) {
  return (
    <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-bold">
      🔥 {streakDays} Day{streakDays !== 1 ? 's' : ''}
    </div>
  );
}
