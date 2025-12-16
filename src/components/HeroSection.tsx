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
      <div className="container max-w-[1100px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Quote - Left Column */}
          <div
            className={`order-2 lg:order-1 flex justify-center lg:justify-start transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <GlassCard>
              <div className="p-8 md:p-10">
                {/* Top-left decorative line */}
                <div className="flex justify-start mb-4">
                  <div className="w-10 h-[1px] bg-gradient-to-r from-foreground/50 to-transparent" />
                </div>
                
                <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-foreground text-center lg:text-left">
                  "Quiet minds create the loudest impact."
                </p>
                
                {/* Decorative bottom line */}
                <div className="mt-6 flex justify-center lg:justify-end">
                  <div className="w-12 h-[1px] bg-gradient-to-l from-foreground/40 to-transparent" />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Profile Image - Right Column */}
          <div
            className={`order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-1000 delay-300 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
            }`}
          >
            <GlassCard>
              <div className="p-5 md:p-6">
                <div className="relative group">
                  {/* Profile frame */}
                  <div className="relative p-1 rounded-full bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30">
                    <div className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden border border-muted/30 shadow-xl transition-all duration-700 group-hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] group-hover:scale-[1.02]">
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
