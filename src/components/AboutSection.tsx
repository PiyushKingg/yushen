import { useEffect, useRef, useState } from "react";
import { ExternalLink, MessageCircle } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import GlassCard from "./GlassCard";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 py-24 relative"
    >
      {/* Animated decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 border border-muted/10 rounded-3xl rotate-12 animate-float-slow" />
      <div className="absolute bottom-32 left-10 w-40 h-40 border border-muted/15 rounded-2xl -rotate-6 animate-float-slower" />
      <div className="absolute top-1/3 left-1/4 w-32 h-32 border border-muted/10 rounded-xl rotate-45 animate-pulse-slow" />
      
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="container max-w-[1100px] mx-auto relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}
        >
          <GlassCard className="inline-block">
            <div className="flex items-center gap-3 px-6 py-3">
              <span className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse" />
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">About Me</span>
              <span className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse" />
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Profile Image & Name - Left Column */}
          <div
            className={`lg:col-span-4 flex flex-col items-center transition-all duration-1000 delay-100 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            <GlassCard>
              <div className="p-6 md:p-8 flex flex-col items-center">
                <div className="relative group">
                  {/* Animated outer glow */}
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-foreground/15 via-transparent to-foreground/10 blur-xl opacity-50 group-hover:opacity-80 transition-all duration-700 animate-pulse-slow" />
                  
                  {/* Spinning ring decoration */}
                  <div className="absolute -inset-3 rounded-full border border-dashed border-muted/20 animate-spin-slow" />

                  <div className="relative p-1 rounded-full bg-gradient-to-br from-muted/50 via-muted/30 to-muted/50">
                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border border-muted/50 shadow-xl transition-all duration-700 group-hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.25)] group-hover:scale-[1.03]">
                      <img
                        src={profileImg}
                        alt="Profile photo of Yushen"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Name with animation */}
                <div className="mt-6 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                    Yushen
                  </h2>
                  <div className="mt-2 w-12 h-[2px] mx-auto bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* About Card - Right Column */}
          <div
            className={`lg:col-span-8 transition-all duration-1000 delay-200 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            <GlassCard>
              <div className="p-8 md:p-10">
                {/* Decorative header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[2px] bg-gradient-to-r from-foreground/50 to-transparent" />
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Story</span>
                </div>
                
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-normal">
                  I am an ordinary, introverted teenager who prefers calm, low-key spaces. I spend most of my time online, chatting on Discord and keeping my circle small. I do not speak often, but when I do it is usually with people I trust. I enjoy simple conversations, creating things quietly, and building lightweight tools such as websites, bots, and community servers.
                </p>

                {/* Discord Link */}
                <div className="mt-10 pt-8 border-t border-muted/30">
                  <a
                    href="https://discord.gg/kenrblx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-foreground/10 hover:bg-foreground/20 border border-muted/40 hover:border-foreground/40 rounded-xl text-sm font-medium text-foreground transition-all duration-300 group/link hover:scale-105 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <MessageCircle className="w-4 h-4 group-hover/link:animate-pulse" />
                    <span>Discord server</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Footer */}
        <footer
          className={`mt-32 flex flex-col items-center gap-6 transition-all duration-1000 delay-400 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Decorative line */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-muted-foreground/50 to-transparent" />
          
          {/* Made by button */}
          <GlassCard>
            <div className="px-8 py-4 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Made by Yushen
              </span>
              <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-pulse" />
            </div>
          </GlassCard>
        </footer>
      </div>
    </section>
  );
};

export default AboutSection;