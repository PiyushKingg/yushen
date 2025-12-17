import { useState, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className }: GlassCardProps) => {
  const [transform, setTransform] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [sweepPosition, setSweepPosition] = useState(-100);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!cardRef.current || isAnimating) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt based on click position (tilt toward click)
    const tiltX = ((y - centerY) / centerY) * 8;
    const tiltY = ((centerX - x) / centerX) * 8;
    
    setIsAnimating(true);
    
    // Phase 1: Tilt toward click point
    setTransform(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(0.97)`);
    
    // Start light sweep
    setSweepPosition(-100);
    requestAnimationFrame(() => {
      setSweepPosition(200);
    });
    
    // Phase 2: Overshoot bounce back
    setTimeout(() => {
      setTransform(`perspective(1000px) rotateX(${-tiltX * 0.3}deg) rotateY(${-tiltY * 0.3}deg) scale(1.01)`);
    }, 150);
    
    // Phase 3: Settle to rest
    setTimeout(() => {
      setTransform(`perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`);
    }, 300);
    
    // Reset
    setTimeout(() => {
      setIsAnimating(false);
      setSweepPosition(-100);
    }, 600);
  };

  // Subtle hover tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isAnimating) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((y - centerY) / centerY) * 3;
    const tiltY = ((centerX - x) / centerX) * 3;
    
    setTransform(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1)`);
  };

  const handleMouseLeave = () => {
    if (!isAnimating) {
      setTransform(`perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`);
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative group cursor-pointer",
        className
      )}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      {/* Main card with 3D transform */}
      <div
        ref={innerRef}
        className={cn(
          "relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden",
          "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]",
          "hover:border-white/[0.12]",
          isAnimating ? "transition-transform duration-150 ease-out" : "transition-all duration-300 ease-out"
        )}
        style={{ 
          transform: transform || "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Light sweep effect */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `linear-gradient(105deg, transparent 0%, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%, transparent 100%)`,
            transform: `translateX(${sweepPosition}%)`,
            transition: isAnimating ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          }}
        />
        
        {/* Subtle inner gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
        
        {/* Dynamic shadow overlay on click */}
        <div 
          className={cn(
            "absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300",
            isAnimating ? "opacity-100" : "opacity-0"
          )}
          style={{
            boxShadow: "inset 0 0 60px -20px rgba(255,255,255,0.1)"
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
