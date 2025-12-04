import { useEffect, useRef, useCallback } from "react";

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  pulsePhase: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

const AnimatedDotBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dotsRef = useRef<Dot[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  const handleClick = useCallback((e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add ripple effect
    ripplesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: 200,
      opacity: 0.6,
    });

    // Push dots away from click
    dotsRef.current.forEach((dot) => {
      const dx = dot.x - x;
      const dy = dot.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 150) {
        const force = (150 - distance) / 150;
        dot.vx += (dx / distance) * force * 8;
        dot.vy += (dy / distance) * force * 8;
      }
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      const spacing = 40;
      const cols = Math.ceil(window.innerWidth / spacing) + 2;
      const rows = Math.ceil(window.innerHeight / spacing) + 2;
      dotsRef.current = [];

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          dotsRef.current.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            opacity: 0.15 + Math.random() * 0.2,
            size: 1.5 + Math.random() * 1,
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const animate = () => {
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw and update ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += 4;
        ripple.opacity *= 0.96;

        if (ripple.opacity < 0.01) return false;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner ripple
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        return true;
      });

      // Draw connecting lines between nearby dots
      dotsRef.current.forEach((dot, i) => {
        for (let j = i + 1; j < dotsRef.current.length; j++) {
          const other = dotsRef.current[j];
          const dx = dot.x - other.x;
          const dy = dot.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            const opacity = (1 - distance / 80) * 0.08;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      // Update and draw dots
      dotsRef.current.forEach((dot) => {
        if (!prefersReducedMotion) {
          // Mouse interaction
          const mdx = mouseRef.current.x - dot.x;
          const mdy = mouseRef.current.y - dot.y;
          const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mouseDistance < 120) {
            const force = (120 - mouseDistance) / 120;
            dot.vx -= (mdx / mouseDistance) * force * 0.3;
            dot.vy -= (mdy / mouseDistance) * force * 0.3;
          }

          dot.x += dot.vx;
          dot.y += dot.vy;

          // Spring back to base position
          dot.vx += (dot.baseX - dot.x) * 0.02;
          dot.vy += (dot.baseY - dot.y) * 0.02;

          // Damping
          dot.vx *= 0.95;
          dot.vy *= 0.95;
        }

        // Pulsing opacity
        const pulse = Math.sin(timeRef.current * 2 + dot.pulsePhase) * 0.1;
        const currentOpacity = dot.opacity + pulse;

        // Glow effect for dots near mouse
        const mdx = mouseRef.current.x - dot.x;
        const mdy = mouseRef.current.y - dot.y;
        const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);
        const glowBoost = mouseDistance < 100 ? (1 - mouseDistance / 100) * 0.4 : 0;

        // Draw outer glow
        if (glowBoost > 0) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${glowBoost * 0.2})`;
          ctx.fill();
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity + glowBoost})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleClick, handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 cursor-crosshair"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default AnimatedDotBackground;
