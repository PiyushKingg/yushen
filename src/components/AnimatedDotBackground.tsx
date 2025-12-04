import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
}

const AnimatedDotBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initDots();
    };

    const initDots = () => {
      dotsRef.current = [];
      const spacing = 50;
      const cols = Math.ceil(window.innerWidth / spacing) + 1;
      const rows = Math.ceil(window.innerHeight / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dotsRef.current.push({
            x: i * spacing,
            y: j * spacing,
            baseX: i * spacing,
            baseY: j * spacing,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const time = Date.now() * 0.0005;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      dotsRef.current.forEach((dot) => {
        // Gentle wave motion
        const waveX = Math.sin(time + dot.baseY * 0.01) * 3;
        const waveY = Math.cos(time + dot.baseX * 0.01) * 3;

        // Mouse interaction
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        let pushX = 0;
        let pushY = 0;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 20;
          pushX = -(dx / dist) * force;
          pushY = -(dy / dist) * force;
        }

        // Target position
        const targetX = dot.baseX + waveX + pushX;
        const targetY = dot.baseY + waveY + pushY;

        // Smooth interpolation
        dot.vx += (targetX - dot.x) * 0.05;
        dot.vy += (targetY - dot.y) * 0.05;
        dot.vx *= 0.9;
        dot.vy *= 0.9;
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Calculate opacity based on position (fade edges)
        const edgeFadeX = Math.min(dot.x / 100, (window.innerWidth - dot.x) / 100, 1);
        const edgeFadeY = Math.min(dot.y / 100, (window.innerHeight - dot.y) / 100, 1);
        const edgeFade = Math.min(edgeFadeX, edgeFadeY);

        // Draw dot
        const baseOpacity = 0.15;
        const hoverBoost = dist < maxDist ? (1 - dist / maxDist) * 0.3 : 0;
        const opacity = (baseOpacity + hoverBoost) * edgeFade;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
        ctx.fill();
      });

      // Draw connections between nearby dots
      ctx.strokeStyle = "rgba(6, 182, 212, 0.03)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < dotsRef.current.length; i++) {
        for (let j = i + 1; j < dotsRef.current.length; j++) {
          const dot1 = dotsRef.current[i];
          const dot2 = dotsRef.current[j];
          const dx = dot1.x - dot2.x;
          const dy = dot1.y - dot2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(dot1.x, dot1.y);
            ctx.lineTo(dot2.x, dot2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default AnimatedDotBackground;
