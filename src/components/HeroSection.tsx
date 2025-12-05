import { useEffect, useRef, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import GlassCard from "./GlassCard";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 py-16 relative overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-muted/20 to-transparent rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-muted/10 to-transparent rounded-full blur-3xl animate-float-slower" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-radial from-muted/15 to-transparent rounded-full blur-3xl animate-pulse-slow" />

      <div className="container max-w-[1100px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Quote - Left Column */}
          <div
            className={`order-2 lg:order-1 text-center lg:text-left transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <GlassCard className="inline-block hover:animate-subtle-bounce">
              <div className="p-8 md:p-10">
                {/* Decorative accent */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[2px] bg-gradient-to-r from-foreground/60 to-transparent animate-pulse-slow" />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Wisdom</span>
                </div>
                
                <blockquote className="relative">
                  <span className="absolute -top-4 -left-2 text-5xl text-muted-foreground/30 font-serif animate-fade-in-delayed">"</span>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-foreground pl-4">
                    Quiet minds create the loudest impact.
                  </p>
                  <span className="absolute -bottom-2 right-0 text-5xl text-muted-foreground/30 font-serif animate-fade-in-delayed-more">"</span>
                </blockquote>
                
                {/* Decorative bottom line */}
                <div className="mt-6 flex items-center gap-3 justify-end">
                  <div className="w-12 h-[1px] bg-gradient-to-l from-foreground/40 to-transparent" />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Profile Image - Right Column */}
          <div
            className={`order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-1000 delay-300 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100 rotate-0" : "opacity-0 translate-y-16 scale-90 rotate-3"
            }`}
          >
            <GlassCard className="inline-block">
              <div className="p-5 md:p-6">
                <div className="relative group">
                  {/* Animated outer glow */}
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-foreground/15 via-transparent to-foreground/10 blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse-slow" />
                  
                  {/* Spinning ring decoration */}
                  <div className="absolute -inset-4 rounded-full border border-dashed border-muted/20 animate-spin-slow" />
                  <div className="absolute -inset-6 rounded-full border border-dashed border-muted/10 animate-spin-slower" />
                  
                  {/* Profile frame */}
                  <div className="relative p-1 rounded-full bg-gradient-to-br from-muted/50 via-muted/30 to-muted/50 shadow-lg">
                    <div className="w-44 h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full overflow-hidden border border-muted/50 shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.3)] group-hover:scale-[1.03]">
                      <img
                        src={profileImg}
                        alt="Profile photo of Yushen"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115"
                        loading="eager"
                      />
                    </div>
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-foreground/30 rounded-tr-lg animate-pulse-slow" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-foreground/30 rounded-bl-lg animate-pulse-slow" />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;