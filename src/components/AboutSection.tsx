import { useEffect, useRef, useState } from "react";
import { ExternalLink, MessageCircle, Code, Globe, Heart } from "lucide-react";

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
              {/* Decorative frame */}
              <div className="absolute -inset-6 border border-dashed border-muted/30 rounded-3xl" />
              <div className="absolute -inset-3 bg-gradient-to-br from-muted/20 to-transparent rounded-2xl" />
              
              {/* Corner dots */}
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-foreground/40 rounded-full" />
              <div className="absolute -top-2 -right-2 w-2 h-2 bg-foreground/40 rounded-full" />
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-foreground/40 rounded-full" />
              <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-foreground/40 rounded-full" />

              <div className="relative p-1.5 rounded-2xl bg-gradient-to-br from-muted/50 via-muted/30 to-muted/50">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden border border-muted/40 shadow-xl transition-all duration-500 group-hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] group-hover:scale-[1.02]">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Profile photo of Yushen"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            
            <h2 className="mt-8 text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Yushen
            </h2>
            
            {/* Role badge */}
            <div className="mt-3 px-4 py-1.5 bg-muted/30 border border-muted/40 rounded-full">
              <span className="text-sm font-medium text-muted-foreground">Digital Creator</span>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">∞</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Ideas</div>
              </div>
              <div className="w-px h-8 bg-muted/40" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Online</div>
              </div>
            </div>
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
                {/* Card header decoration */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <div className="flex-1" />
                  <span className="text-xs font-mono text-muted-foreground">about.txt</span>
                </div>

                <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-normal">
                  I am an ordinary, introverted teenager who prefers calm, low-key spaces. I spend most of my time online, chatting on Discord and keeping my circle small. I do not speak often, but when I do it is usually with people I trust. I enjoy simple conversations, creating things quietly, and building lightweight tools such as websites, bots, and community servers.
                </p>

                {/* Skills/Interests */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {[
                    { icon: MessageCircle, label: "Discord" },
                    { icon: Code, label: "Websites" },
                    { icon: Globe, label: "Bots" },
                    { icon: Heart, label: "Communities" },
                  ].map(({ icon: Icon, label }, i) => (
                    <div
                      key={label}
                      className={`flex items-center gap-2 px-4 py-2 bg-muted/30 border border-muted/40 rounded-xl hover:bg-muted/50 hover:border-muted/60 transition-all duration-300 cursor-default ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${400 + i * 100}ms` }}
                    >
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground/80">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Discord Link */}
                <div className="mt-10 pt-8 border-t border-muted/30">
                  <a
                    href="https://discord.gg/your-server-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-foreground/10 hover:bg-foreground/20 border border-muted/40 hover:border-foreground/30 rounded-xl text-sm font-medium text-foreground transition-all duration-300 group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Join Discord Server</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className={`mt-32 flex flex-col items-center gap-6 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Decorative line */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent" />
          
          {/* Made by button */}
          <button
            className="group inline-flex items-center gap-3 px-6 py-3 bg-muted/20 hover:bg-muted/40 border border-muted/30 hover:border-muted/50 rounded-full transition-all duration-300 cursor-default"
          >
            <span className="w-2 h-2 bg-foreground/40 rounded-full group-hover:bg-foreground/60 transition-colors" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Made by Yushen
            </span>
            <span className="w-2 h-2 bg-foreground/40 rounded-full group-hover:bg-foreground/60 transition-colors" />
          </button>

          {/* Year */}
          <span className="text-xs text-muted-foreground/60">© 2024</span>
        </footer>
      </div>
    </section>
  );
};

export default AboutSection;
