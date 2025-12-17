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
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [showRipple, setShowRipple] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Get click position relative to card
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setClickPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 600);
    }
    
    // Start animation from top-left (position 0)
    setBorderPosition(0);
    setIsAnimating(true);
  };

  // Listen for clicks outside to stop animation
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        // Instantly stop animation
        setIsAnimating(false);
        cancelAnimationFrame(animationRef.current);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Smooth line animation - only runs when isAnimating is true
  useEffect(() => {
    if (!borderAnimation || !isAnimating) return;
    
    const speed = 1.2; // Smooth constant speed
    
    const animate = () => {
      setBorderPosition(prev => {
        const newPosition = prev + speed;
        
        // Stop after one full lap (400 = full perimeter)
        if (newPosition >= 400) {
          setIsAnimating(false);
          return 0;
        }
        
        return newPosition;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [borderAnimation, isAnimating]);

  // Calculate line position along the perimeter (starts top-left)
  const getLineStyle = () => {
    const progress = borderPosition / 400;
    const lineLength = 60;
    
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
      {/* Animated line border - ONLY visible when animating */}
      {borderAnimation && isAnimating && (
        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none">
          <div
            className="absolute transition-none"
            style={{
              ...getLineStyle(),
              background: getLineStyle().width === '2px' 
                ? `linear-gradient(to bottom, transparent, rgba(255,255,255,0.8), transparent)`
                : `linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent)`,
              boxShadow: '0 0 12px rgba(255,255,255,0.4)',
            }}
          />
        </div>
      )}

      {/* Click ripple effect */}
      {showRipple && clickPosition && (
        <div
          className="absolute pointer-events-none z-20 rounded-full bg-white/20 animate-ping"
          style={{
            left: clickPosition.x - 20,
            top: clickPosition.y - 20,
            width: 40,
            height: 40,
          }}
        />
      )}

      {/* Glass background */}
      <div
        className={cn(
          "relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl transition-all duration-300 ease-out",
          "hover:bg-white/[0.04] hover:border-white/[0.1]",
          "shadow-[0_4px_24px_-8px_rgba(0,0,0,0.2)]",
          isPressed && "scale-[0.995]",
          isAnimating && "border-white/[0.15] shadow-[0_0_20px_-8px_rgba(255,255,255,0.1)]"
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
