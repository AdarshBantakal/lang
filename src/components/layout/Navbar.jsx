import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="glass sticky top-0 z-50 border-b-0 border-white/10 px-6 py-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-2xl font-extrabold flex items-center gap-2">
        <span className="bg-[#2ecc71] text-black p-1.5 rounded-lg shadow-[0_0_10px_rgba(46,204,113,0.6)]">
          &lt;/&gt;
        </span>
        <span className="text-white tracking-tight">Lang<span className="text-[#2ecc71]">Bridge</span></span>
      </Link>
      <div className="flex gap-6 font-medium text-sm">
        <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
        <Link to="/lessons" className="text-gray-300 hover:text-white transition-colors">Lessons</Link>
        <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors">Leaderboard</Link>
        <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</Link>
      </div>
    </nav>
  );
}
