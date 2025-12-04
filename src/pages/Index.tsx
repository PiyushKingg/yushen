import AnimatedDotBackground from "@/components/AnimatedDotBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Animated Dot Background */}
      <AnimatedDotBackground />

      {/* Content */}
      <div className="relative" style={{ zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
      </div>
    </main>
  );
};

export default Index;
