import { useEffect, useRef, useState } from "react";
import profileImg from "@/assets/profile.jpg";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Quote - Left Column */}
          <div
            className={`order-2 lg:order-1 text-center lg:text-left transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Decorative line */}
            <div className="hidden lg:flex items-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-foreground/60 to-transparent" />
            </div>

            <blockquote className="relative">
              <span className="absolute -top-8 -left-4 text-7xl text-muted/30 font-serif">"</span>
              <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-foreground">
                Quiet minds create the loudest impact.
              </p>
              <span className="absolute -bottom-4 right-0 lg:right-auto lg:-right-4 text-7xl text-muted/30 font-serif">"</span>
            </blockquote>
          </div>

          {/* Profile Image - Right Column */}
          <div
            className={`order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Profile frame */}
              <div className="relative p-1.5 rounded-full bg-gradient-to-br from-muted/40 via-muted/20 to-muted/40">
                <div className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-muted/40 shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.2)] group-hover:scale-[1.02]">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;