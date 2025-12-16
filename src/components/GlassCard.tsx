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
  const [borderPosition, setBorderPosition] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0.3);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const clickTimeRef = useRef<number>(0);
  const startPositionRef = useRef<number>(0);

  const handleClick = () => {
    setIsClicked(true);
    clickTimeRef.current = Date.now();
    startPositionRef.current = borderPosition;
    setCurrentSpeed(4); // Speed up immediately on click
  };

  // Single smooth line animation around the border with dynamic speed
  useEffect(() => {
    if (!borderAnimation) return;
    
    let position = borderPosition;
    
    const animate = () => {
      const now = Date.now();
      const timeSinceClick = now - clickTimeRef.current;
      
      // Calculate target speed based on time since click
      let targetSpeed = 0.3; // Normal slow speed
      
      if (isClicked && timeSinceClick < 2000) {
        // Fast for first 2 seconds after click
        targetSpeed = 4;
      } else if (isClicked && timeSinceClick >= 2000) {
        // Gradually slow down after completing the loop
        const slowdownProgress = Math.min((timeSinceClick - 2000) / 1500, 1);
        targetSpeed = 4 - (3.7 * slowdownProgress); // Ease from 4 to 0.3
        
        if (slowdownProgress >= 1) {
          setIsClicked(false);
        }
      }
      
      // Smooth speed transition
      setCurrentSpeed(prev => prev + (targetSpeed - prev) * 0.05);
      
      position = (position + currentSpeed) % 400;
      setBorderPosition(position);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, [isClicked, borderAnimation, currentSpeed]);

  // Calculate line position along the perimeter
  const getLineStyle = () => {
    const progress = borderPosition / 400;
    const lineLength = isClicked ? 80 : 60;
    
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
      {/* Animated single line border */}
      {borderAnimation && (
        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none">
          {/* Moving line */}
          <div
            className={cn(
              "absolute transition-opacity duration-300",
              isClicked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
            style={{
              ...getLineStyle(),
              background: getLineStyle().width === '2px' 
                ? `linear-gradient(to bottom, transparent, rgba(255,255,255,${isClicked ? 0.9 : 0.6}), transparent)`
                : `linear-gradient(to right, transparent, rgba(255,255,255,${isClicked ? 0.9 : 0.6}), transparent)`,
            }}
          />
        </div>
      )}

      {/* Click pulse effect */}
      <div 
        className={cn(
          "absolute -inset-1 rounded-2xl transition-all duration-700 ease-out pointer-events-none",
          isClicked ? "bg-white/5 scale-[1.01]" : "bg-transparent scale-100"
        )}
        style={{ opacity: isClicked ? 1 : 0 }}
      />

      {/* Glass background */}
      <div
        className={cn(
          "relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl transition-all duration-500 ease-out",
          "hover:bg-white/[0.05] hover:border-white/[0.12]",
          "shadow-[0_4px_24px_-8px_rgba(0,0,0,0.3)]",
          isPressed && "scale-[0.99]",
          isClicked && "shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]"
        )}
      >
        {/* Subtle inner highlight */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlassCard;
