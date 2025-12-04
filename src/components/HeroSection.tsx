import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 py-16"
    >
      <div className="container max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Quote - Left Column */}
          <div
            className={`order-1 lg:order-1 text-center lg:text-left transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-foreground">
              "Quiet minds create the loudest impact."
            </blockquote>
          </div>

          {/* Profile Image - Right Column */}
          <div
            className={`order-2 lg:order-2 flex justify-center lg:justify-end transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-muted/30 to-transparent blur-xl opacity-60" />
              
              {/* Profile image container */}
              <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-muted/40 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Profile photo of Yushen"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
