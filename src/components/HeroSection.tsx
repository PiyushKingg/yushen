import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-muted/20 rounded-full animate-pulse opacity-30" />
      <div className="absolute bottom-32 right-20 w-48 h-48 border border-muted/10 rounded-full" />
      <div className="absolute top-1/3 right-10 w-2 h-2 bg-foreground/30 rounded-full animate-ping" />
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-foreground/40 rounded-full animate-pulse" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-muted/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-muted/10 to-transparent rounded-full blur-3xl" />

      <div className="container max-w-[1100px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Quote - Left Column */}
          <div
            className={`order-2 lg:order-1 text-center lg:text-left transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Decorative line */}
            <div className="hidden lg:flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gradient-to-r from-foreground/60 to-transparent" />
              <Sparkles className="w-4 h-4 text-foreground/40" />
            </div>

            <blockquote className="relative">
              <span className="absolute -top-8 -left-4 text-7xl text-muted/30 font-serif">"</span>
              <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-foreground">
                Quiet minds create the loudest impact.
              </p>
              <span className="absolute -bottom-4 right-0 lg:right-auto lg:-right-4 text-7xl text-muted/30 font-serif">"</span>
            </blockquote>

            {/* Decorative tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-12">
              {["dreamer", "creator", "introvert"].map((tag, i) => (
                <span
                  key={tag}
                  className={`px-4 py-1.5 text-xs font-medium uppercase tracking-widest border border-muted/40 rounded-full text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-all duration-300 cursor-default ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${600 + i * 100}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Profile Image - Right Column */}
          <div
            className={`order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            <div className="relative group">
              {/* Animated rings */}
              <div className="absolute -inset-8 rounded-full border border-muted/20 animate-pulse" />
              <div className="absolute -inset-16 rounded-full border border-muted/10" />
              <div className="absolute -inset-24 rounded-full border border-muted/5" />
              
              {/* Corner accents */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-foreground/30 rounded-tl-lg" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-foreground/30 rounded-tr-lg" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-foreground/30 rounded-bl-lg" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-foreground/30 rounded-br-lg" />

              {/* Outer glow */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-foreground/20 via-transparent to-foreground/10 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Profile frame */}
              <div className="relative p-2 rounded-full bg-gradient-to-br from-muted/40 via-muted/20 to-muted/40">
                <div className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-muted/60 shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.3)] group-hover:scale-[1.02]">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Profile photo of Yushen"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Status indicator */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-background/80 backdrop-blur-sm border border-muted/40 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
