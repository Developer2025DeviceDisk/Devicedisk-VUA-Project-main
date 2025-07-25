// app/components/Hero.tsx
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import { WithGenericLoader } from "./components/Loader";

export default function Homepage() {
  return (
    <div>
      <WithGenericLoader>
        <HeroSection />
        <About />
      </WithGenericLoader>
    </div>
  );
}
