import { useEffect, useRef, useState } from "react";
import { ExternalLink, MessageCircle } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

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
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 border border-muted/10 rounded-3xl rotate-12" />
      <div className="absolute bottom-32 left-10 w-40 h-40 border border-muted/15 rounded-2xl -rotate-6" />
      
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="container max-w-[1100px] mx-auto relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-muted/30 border border-muted/40 rounded-full mb-6">
            <span className="w-2 h-2 bg-foreground/60 rounded-full" />
            <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">About Me</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Profile Image & Name - Left Column */}
          <div
            className={`lg:col-span-4 flex flex-col items-center transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

              <div className="relative p-1.5 rounded-full bg-gradient-to-br from-muted/40 via-muted/20 to-muted/40">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border border-muted/40 shadow-xl transition-all duration-500 group-hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] group-hover:scale-[1.02]">
                  <img
                    src={profileImg}
                    alt="Profile photo of Yushen"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            
            <h2 className="mt-6 text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Yushen
            </h2>
          </div>

          {/* About Card - Right Column */}
          <div
            className={`lg:col-span-8 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative group">
              {/* Card glow effect */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-muted/40 via-transparent to-muted/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Main card */}
              <div className="relative bg-card/60 backdrop-blur-xl border border-muted/40 rounded-3xl p-8 md:p-10 shadow-2xl transition-all duration-500 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] group-hover:translate-y-[-4px]">
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-normal">
                  I am an ordinary, introverted teenager who prefers calm, low-key spaces. I spend most of my time online, chatting on Discord and keeping my circle small. I do not speak often, but when I do it is usually with people I trust. I enjoy simple conversations, creating things quietly, and building lightweight tools such as websites, bots, and community servers.
                </p>

                {/* Discord Link */}
                <div className="mt-10 pt-8 border-t border-muted/30">
                  <a
                    href="https://discord.gg/kenrblx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-foreground/10 hover:bg-foreground/20 border border-muted/40 hover:border-foreground/30 rounded-xl text-sm font-medium text-foreground transition-all duration-300 group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Discord server</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className={`mt-32 flex flex-col items-center gap-6 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Decorative line */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent" />
          
          {/* Made by button */}
          <button
            className="group inline-flex items-center gap-3 px-6 py-3 bg-muted/20 hover:bg-muted/40 border border-muted/30 hover:border-muted/50 rounded-full transition-all duration-300 cursor-default"
          >
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Made by Yushen
            </span>
          </button>
        </footer>
      </div>
    </section>
  );
};

export default AboutSection;