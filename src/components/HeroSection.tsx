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
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-muted/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-muted/10 to-transparent rounded-full blur-3xl" />

      <div className="container max-w-[1100px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Quote - Left Column */}
          <div
            className={`order-2 lg:order-1 text-center lg:text-left transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <GlassCard className="inline-block">
              <div className="p-8 md:p-10">
                <blockquote className="relative">
                  <span className="absolute -top-4 -left-2 text-5xl text-muted-foreground/40 font-serif">"</span>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-foreground pl-4">
                    Quiet minds create the loudest impact.
                  </p>
                  <span className="absolute -bottom-2 right-0 text-5xl text-muted-foreground/40 font-serif">"</span>
                </blockquote>
              </div>
            </GlassCard>
          </div>

          {/* Profile Image - Right Column */}
          <div
            className={`order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            <GlassCard className="inline-block">
              <div className="p-4 md:p-5">
                <div className="relative group">
                  {/* Outer glow */}
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Profile frame - smaller size */}
                  <div className="relative p-1 rounded-full bg-gradient-to-br from-muted/40 via-muted/20 to-muted/40">
                    <div className="w-44 h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full overflow-hidden border border-muted/40 shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.2)] group-hover:scale-[1.02]">
                      <img
                        src={profileImg}
                        alt="Profile photo of Yushen"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="eager"
                      />
                    </div>
                  </div>
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