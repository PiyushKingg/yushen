import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-4 opacity-0 animate-fade-up">
              <p className="text-primary font-medium tracking-wider uppercase text-sm">
                Welcome to my space
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient">I'm </span>
                <span className="text-gradient-accent">Yushen</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Developer and digital craftsman. I build elegant solutions 
                with clean code and thoughtful design.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-up stagger-2">
              <Button 
                variant="glow" 
                size="lg"
                className="group"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="glass" 
                size="lg"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get in Touch
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 justify-center lg:justify-start opacity-0 animate-fade-up stagger-3">
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-foreground">5+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-foreground">30+</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center order-1 lg:order-2 opacity-0 animate-fade-up stagger-1">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-110" />
              
              {/* Image container */}
              <div className="relative animate-float">
                <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-primary/30 shadow-glow">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary to-primary/10 flex items-center justify-center">
                    {/* Placeholder avatar with initials */}
                    <span className="text-7xl sm:text-8xl lg:text-9xl font-bold text-primary/50">Y</span>
                  </div>
                </div>
                
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border border-primary/10 scale-110" />
                <div className="absolute inset-0 rounded-full border border-primary/5 scale-125" />
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary/30 blur-sm animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-primary/20 blur-md animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in stagger-5">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
