import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 glass h-[calc(100vh-64px)] border-r border-white/10 p-6 shadow-xl">
      <nav className="flex flex-col gap-3">
        {[
          { path: '/dashboard', label: 'Dashboard', icon: '📊' },
          { path: '/lessons', label: 'Lessons', icon: '📚' },
          { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
          { path: '/profile', label: 'Profile', icon: '👤' },
        ].map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`p-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-medium ${
              isActive(item.path) 
                ? 'bg-[#2ecc71]/20 text-[#2ecc71] border border-[#2ecc71]/30 shadow-[0_0_15px_rgba(46,204,113,0.15)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
