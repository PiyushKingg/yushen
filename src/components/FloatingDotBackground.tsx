import { useEffect, useRef, useCallback } from "react";

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  targetOpacity: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

const FloatingDotBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  const initDots = useCallback((width: number, height: number) => {
    const dots: Dot[] = [];
    const numDots = Math.min(45, Math.floor((width * height) / 25000));
    
    for (let i = 0; i < numDots; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      dots.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2.5 + 2,
        opacity: Math.random() * 0.3 + 0.15,
        targetOpacity: Math.random() * 0.3 + 0.15,
      });
    }
    return dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      dotsRef.current = initDots(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e: MouseEvent) => {
      // Add ripple effect
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 120,
        opacity: 0.5,
      });

      // Push dots away from click
      dotsRef.current.forEach((dot) => {
        const dx = dot.x - e.clientX;
        const dy = dot.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          dot.vx += (dx / dist) * force * 4;
          dot.vy += (dy / dist) * force * 4;
          dot.targetOpacity = Math.min(0.6, dot.opacity + force * 0.3);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += 2;
        ripple.opacity *= 0.97;

        if (ripple.opacity < 0.01) return false;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        return true;
      });

      // Update and draw dots
      dotsRef.current.forEach((dot) => {
        // Float around
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Gentle return to base position
        dot.vx += (dot.baseX - dot.x) * 0.0008;
        dot.vy += (dot.baseY - dot.y) * 0.0008;

        // Apply friction
        dot.vx *= 0.99;
        dot.vy *= 0.99;

        // Mouse interaction - gentle attraction
        const dx = mouseRef.current.x - dot.x;
        const dy = mouseRef.current.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120 * 0.015;
          dot.vx += (dx / dist) * force;
          dot.vy += (dy / dist) * force;
          dot.targetOpacity = 0.35;
        } else {
          dot.targetOpacity = Math.random() * 0.2 + 0.1;
        }

        // Smooth opacity transition
        dot.opacity += (dot.targetOpacity - dot.opacity) * 0.03;

        // Boundary wrapping
        if (dot.x < -20) { dot.x = canvas.width + 20; dot.baseX = dot.x; }
        if (dot.x > canvas.width + 20) { dot.x = -20; dot.baseX = dot.x; }
        if (dot.y < -20) { dot.y = canvas.height + 20; dot.baseY = dot.y; }
        if (dot.y > canvas.height + 20) { dot.y = -20; dot.baseY = dot.y; }

        // Draw dot with subtle glow
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, dot.radius * 2.5
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${dot.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * 1.2})`;
        ctx.fill();
      });

      // Draw subtle connections between nearby dots
      dotsRef.current.forEach((dot, i) => {
        dotsRef.current.slice(i + 1).forEach((other) => {
          const dx = dot.x - other.x;
          const dy = dot.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initDots]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

export default FloatingDotBackground;
