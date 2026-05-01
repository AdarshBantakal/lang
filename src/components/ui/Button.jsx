export default function Button({ children, className = "", variant = "primary", ...props }) {
  const baseStyle = "px-6 py-2.5 rounded-lg font-bold transition-all duration-300 transform active:scale-95";
  
  const variants = {
    primary: "bg-[#2ecc71] text-black hover:bg-[#27ae60] shadow-[0_0_15px_rgba(46,204,113,0.4)] hover:shadow-[0_0_25px_rgba(46,204,113,0.6)] hover:-translate-y-0.5",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm",
    danger: "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
