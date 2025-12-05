import { useState, useRef, ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  borderAnimation?: boolean;
}

const GlassCard = ({ children, className, borderAnimation = true }: GlassCardProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [borderRotation, setBorderRotation] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 800);
  };

  // Continuous border animation
  useEffect(() => {
    let rotation = 0;
    const animate = () => {
      rotation += isClicked ? 8 : 1;
      setBorderRotation(rotation);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, [isClicked]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative group cursor-pointer",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleClick}
    >
      {/* Animated border container */}
      {borderAnimation && (
        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
          {/* Conic gradient follow mouse */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `conic-gradient(from ${borderRotation}deg at ${mousePosition.x}px ${mousePosition.y}px, transparent, rgba(255,255,255,0.4), transparent, rgba(255,255,255,0.2), transparent)`,
            }}
          />
          
          {/* Spinning border lines */}
          <div 
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              isClicked && "opacity-100"
            )}
            style={{ transform: `rotate(${borderRotation}deg)` }}
          >
            {/* Top line */}
            <div className="absolute top-0 left-1/2 w-16 h-[2px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            {/* Bottom line */}
            <div className="absolute bottom-0 left-1/2 w-16 h-[2px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            {/* Left line */}
            <div className="absolute left-0 top-1/2 w-[2px] h-16 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/70 to-transparent" />
            {/* Right line */}
            <div className="absolute right-0 top-1/2 w-[2px] h-16 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/70 to-transparent" />
          </div>

          {/* Click pulse effect */}
          <div 
            className={cn(
              "absolute inset-0 rounded-2xl transition-all duration-300",
              isClicked ? "bg-white/20 scale-105" : "bg-transparent scale-100"
            )}
            style={{ opacity: isClicked ? 1 : 0 }}
          />
        </div>
      )}

      {/* Glass background - more visible */}
      <div
        className={cn(
          "relative bg-muted/40 backdrop-blur-2xl border border-muted/50 rounded-2xl transition-all duration-300",
          "hover:bg-muted/50 hover:border-muted/60 hover:shadow-[0_8px_40px_-12px_rgba(255,255,255,0.15)]",
          "shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]",
          isPressed && "scale-[0.98]",
          isClicked && "shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
        )}
      >
        {/* Inner glow on edges */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
        
        {/* Shine effect on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlassCard;