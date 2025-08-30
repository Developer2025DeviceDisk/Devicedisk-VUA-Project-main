// components/LandingPage/index.tsx
import HeroSection from "./HeroSection";
import ParallaxSection from "./ParallaxSection";
import ServicesSection from "./ServicesSection";
import FoundationSection from "./FoundationSection";
import VideoSection from "./VideoSection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <ParallaxSection />
      <ServicesSection />
      <FoundationSection/>
      <VideoSection/>
    </div>
  );
}
