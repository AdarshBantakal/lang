export default function Badge({ children, className = "", color = "indigo" }) {
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-${color}-100 text-${color}-800 ${className}`}>
      {children}
    </span>
  );
}
