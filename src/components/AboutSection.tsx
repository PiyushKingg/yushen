import { Code2, Palette, Sparkles } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">
            About Me
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">
            Crafting Digital Experiences
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              {/* Main image container */}
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-2xl" />
                <div className="relative glass-card p-2 rounded-3xl overflow-hidden">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary via-card to-secondary flex items-center justify-center overflow-hidden">
                    <div className="text-center p-8">
                      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mb-6 shadow-glow">
                        <span className="text-5xl font-bold text-primary">Y</span>
                      </div>
                      <p className="text-muted-foreground text-sm">Developer & Creator</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-full opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Clean Code</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 glass-card px-4 py-2 rounded-full opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Design Focus</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content Card */}
          <div className="space-y-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="glass-card p-8 rounded-3xl shadow-premium">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">The Journey</h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                I transform complex problems into elegant, intuitive solutions. 
                With a passion for both aesthetics and functionality, I bridge 
                the gap between design and development.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-8">
                Every project is an opportunity to create something meaningful—
                software that not only works flawlessly but feels right to use.
              </p>

              {/* Skills/Tags */}
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Node.js", "UI/UX", "System Design"].map((skill, index) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional info cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-2xl text-center hover:shadow-glow transition-shadow duration-500">
                <p className="text-3xl font-bold text-primary mb-1">100%</p>
                <p className="text-sm text-muted-foreground">Dedication</p>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center hover:shadow-glow transition-shadow duration-500">
                <p className="text-3xl font-bold text-primary mb-1">24/7</p>
                <p className="text-sm text-muted-foreground">Availability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
