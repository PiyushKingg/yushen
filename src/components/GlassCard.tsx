import { useState, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className }: GlassCardProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGlowing(true);
    setTimeout(() => setIsGlowing(false), 500);
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
      {/* Glass background with premium glow effect */}
      <div
        className={cn(
          "relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl transition-all duration-300 ease-out",
          "hover:bg-white/[0.04] hover:border-white/[0.12]",
          "shadow-[0_4px_24px_-8px_rgba(0,0,0,0.3)]",
          isPressed && "scale-[0.98] transition-transform duration-100",
          isGlowing && "bg-white/[0.06] border-white/[0.2] shadow-[0_0_40px_-10px_rgba(255,255,255,0.15),inset_0_0_30px_-15px_rgba(255,255,255,0.1)]"
        )}
      >
        {/* Subtle inner highlight */}
        <div 
          className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none transition-opacity duration-300",
            isGlowing && "from-white/[0.08]"
          )} 
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
