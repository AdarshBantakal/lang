export default function Footer() {
  return (
    <footer className="glass border-t border-white/10 text-gray-400 p-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="flex items-center justify-center gap-2">
          &copy; {new Date().getFullYear()} <span className="font-bold text-white tracking-tight">Lang<span className="text-[#2ecc71]">Bridge</span></span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
