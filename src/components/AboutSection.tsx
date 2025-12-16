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
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-16 lg:px-24 py-24 relative"
    >
      <div className="container max-w-[1100px] mx-auto relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Profile Image & Name - Left Column */}
          <div
            className={`lg:col-span-4 flex flex-col items-center transition-all duration-1000 delay-100 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            <GlassCard>
              <div className="p-6 md:p-8 flex flex-col items-center">
                <div className="relative group">
                  <div className="relative p-1 rounded-full bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-muted/30 shadow-xl transition-all duration-700 group-hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.15)] group-hover:scale-[1.02]">
                      <img
                        src={profileImg}
                        alt="Profile photo of Yushen"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Name */}
                <div className="mt-5 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                    Yushen
                  </h2>
                  <div className="mt-2 w-10 h-[1px] mx-auto bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
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
              <div className="p-6 sm:p-8 md:p-10">
                <p className="text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed font-normal">
                  I'm Yushen, also known as Piyush. I'm an ordinary, introverted teenager who prefers calm spaces. I spend most of my time online, chatting on Discord and hanging out with friends. I really enjoy creating things, like websites, projects, and Discord servers, because building and experimenting with new ideas excites me. I really like listening to music, learning new tech skills, and helping others. Well that's all about me, you can join this server below for fun, and chat with amazing people.
                </p>

                {/* Discord Link */}
                <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-muted/20">
                  <a
                    href="https://discord.gg/kenrblx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-5 py-2.5 bg-foreground/5 hover:bg-foreground/10 border border-muted/30 hover:border-foreground/30 rounded-xl text-sm font-medium text-foreground transition-all duration-300 group/link hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <MessageCircle className="w-4 h-4 group-hover/link:animate-pulse" />
                    <span>Discord server</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/link:opacity-100 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Footer */}
        <footer
          className={`mt-24 md:mt-32 flex flex-col items-center gap-6 transition-all duration-1000 delay-400 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Decorative line */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent" />
          
          {/* Made by button */}
          <GlassCard>
            <div className="px-6 py-3 flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Made by Yushen
              </span>
            </div>
          </GlassCard>
        </footer>
      </div>
    </section>
  );
};

export default AboutSection;
