import { useState, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  borderAnimation?: boolean;
}

const GlassCard = ({ children, className, borderAnimation = true }: GlassCardProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

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
    >
      {/* Animated border */}
      {borderAnimation && (
        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `conic-gradient(from 0deg at ${mousePosition.x}px ${mousePosition.y}px, transparent, rgba(255,255,255,0.3), transparent, rgba(255,255,255,0.1), transparent)`,
            }}
          />
          {/* Moving border line animation */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
            <div className="absolute inset-0 animate-border-spin">
              <div 
                className="absolute top-0 left-1/2 w-20 h-[2px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Glass background */}
      <div
        className={cn(
          "relative bg-card/30 backdrop-blur-xl border border-muted/30 rounded-2xl transition-all duration-300",
          "hover:bg-card/40 hover:border-muted/50 hover:shadow-[0_8px_40px_-12px_rgba(255,255,255,0.1)]",
          isPressed && "scale-[0.98] shadow-inner"
        )}
      >
        {/* Shine effect on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`,
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