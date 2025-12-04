import { useEffect, useRef, useState } from "react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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
      className="min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 py-24"
    >
      <div className="container max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Profile Image & Name - Left Column */}
          <div
            className={`lg:col-span-4 flex flex-col items-center transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative group">
              {/* Subtle outer ring */}
              <div className="absolute -inset-2 rounded-full bg-muted/20 blur-lg opacity-50" />
              
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-muted/30 shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Profile photo of Yushen"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            <h2 className="mt-6 text-xl md:text-2xl font-semibold text-foreground tracking-tight">
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
              {/* Card background with subtle gradient */}
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:translate-y-[-2px]">
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-normal">
                  I am an ordinary, introverted teenager who prefers calm, low-key spaces. I spend most of my time online, chatting on Discord and keeping my circle small. I do not speak often, but when I do it is usually with people I trust. I enjoy simple conversations, creating things quietly, and building lightweight tools such as websites, bots, and community servers.
                </p>

                {/* Discord Link */}
                <div className="mt-8 pt-6 border-t border-border/30">
                  <a
                    href="https://discord.gg/your-server-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                  >
                    Discord server
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className={`mt-24 text-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm text-muted-foreground">
            Made by Yushen
          </p>
        </footer>
      </div>
    </section>
  );
};

export default AboutSection;
