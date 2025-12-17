import { useState, useRef, ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  borderAnimation?: boolean;
}

const GlassCard = ({ children, className, borderAnimation = true }: GlassCardProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [borderPosition, setBorderPosition] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const speedRef = useRef(0.12);
  const targetSpeedRef = useRef(0.12);
  const clickStartPosRef = useRef<number | null>(null);
  const hasCompletedLapRef = useRef(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Start fast animation from current position
    clickStartPosRef.current = borderPosition;
    hasCompletedLapRef.current = false;
    targetSpeedRef.current = 2.5;
    setIsAnimating(true);
  };

  // Smooth line animation - always running, speeds up on click for 1 lap
  useEffect(() => {
    if (!borderAnimation) return;
    
    const animate = () => {
      // Smooth speed interpolation
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.02;
      
      setBorderPosition(prev => {
        const newPosition = (prev + speedRef.current) % 400;
        
        // Check if we completed a lap after click
        if (clickStartPosRef.current !== null && !hasCompletedLapRef.current) {
          const startPos = clickStartPosRef.current;
          const traveled = newPosition >= startPos 
            ? newPosition - startPos 
            : (400 - startPos) + newPosition;
          
          if (traveled >= 390) {
            hasCompletedLapRef.current = true;
            targetSpeedRef.current = 0.12;
            clickStartPosRef.current = null;
            setTimeout(() => setIsAnimating(false), 800);
          }
        }
        
        return newPosition;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [borderAnimation]);

  // Calculate line position along the perimeter (starts top-left)
  const getLineStyle = () => {
    const progress = borderPosition / 400;
    const lineLength = isAnimating ? 70 : 50;
    
    if (progress < 0.25) {
      // Top edge (left to right)
      const x = progress / 0.25 * 100;
      return {
        left: `${x}%`,
        top: '0',
        transform: 'translateX(-50%)',
        width: `${lineLength}px`,
        height: '2px',
      };
    } else if (progress < 0.5) {
      // Right edge (top to bottom)
      const y = (progress - 0.25) / 0.25 * 100;
      return {
        right: '0',
        top: `${y}%`,
        transform: 'translateY(-50%)',
        width: '2px',
        height: `${lineLength}px`,
      };
    } else if (progress < 0.75) {
      // Bottom edge (right to left)
      const x = 100 - (progress - 0.5) / 0.25 * 100;
      return {
        left: `${x}%`,
        bottom: '0',
        transform: 'translateX(-50%)',
        width: `${lineLength}px`,
        height: '2px',
      };
    } else {
      // Left edge (bottom to top)
      const y = 100 - (progress - 0.75) / 0.25 * 100;
      return {
        left: '0',
        top: `${y}%`,
        transform: 'translateY(-50%)',
        width: '2px',
        height: `${lineLength}px`,
      };
    }
  };

  const lineOpacity = isAnimating ? 0.95 : 0.5;

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative group cursor-pointer",
        className
      )}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleClick}
    >
      {/* Animated single line border */}
      {borderAnimation && (
        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none">
          {/* Moving line - always visible but more prominent on hover/click */}
          <div
            className={cn(
              "absolute transition-all duration-500",
              isAnimating ? "opacity-100" : "opacity-30 group-hover:opacity-70"
            )}
            style={{
              ...getLineStyle(),
              background: getLineStyle().width === '2px' 
                ? `linear-gradient(to bottom, transparent, rgba(255,255,255,${lineOpacity}), transparent)`
                : `linear-gradient(to right, transparent, rgba(255,255,255,${lineOpacity}), transparent)`,
              boxShadow: isAnimating ? '0 0 8px rgba(255,255,255,0.3)' : 'none',
            }}
          />
        </div>
      )}

      {/* Click pulse effect */}
      <div 
        className={cn(
          "absolute -inset-1 rounded-2xl transition-all duration-700 ease-out pointer-events-none",
          isAnimating ? "bg-white/[0.02] scale-[1.005]" : "bg-transparent scale-100"
        )}
      />

      {/* Glass background */}
      <div
        className={cn(
          "relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl transition-all duration-500 ease-out",
          "hover:bg-white/[0.04] hover:border-white/[0.1]",
          "shadow-[0_4px_24px_-8px_rgba(0,0,0,0.2)]",
          isPressed && "scale-[0.995]",
          isAnimating && "shadow-[0_0_20px_-8px_rgba(255,255,255,0.08)]"
        )}
      >
        {/* Subtle inner highlight */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlassCard;
