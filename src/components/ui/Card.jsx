export default function Card({ children, className = "" }) {
  return (
    <div className={`glass rounded-xl p-6 glow-box ${className}`}>
      {children}
    </div>
  );
}
