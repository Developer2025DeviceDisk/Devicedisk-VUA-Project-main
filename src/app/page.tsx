import About from "./components/About";
import type { Metadata } from "next";
import { WithGenericLoader } from "./components/Loader";
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "AI Digital Marketing, Branding and MarTech Solutions",
  description: "VVWorx is a future-forward AI-driven marketing agency offering branding, content creation, digital marketing, VR/AR solutions, and AI calling agents. Serving Dubai, Mumbai & Pune.",
  other: {
    keywords: "ai digital marketing company, ai branding agency, martech solutions dubai, martech solutions mumbai, martech solutions pune, ai-powered marketing services, vr and ar marketing solutions, ai calling agent services",
  },
};
// TypeScript interfaces for About content
interface HeroSection {
  mainTitle: string;
  rotatingTexts: string[];
  backgroundVideo: string;
  heroImages: string[]; // Changed from object to array
}

interface ParallaxSection {
  title: string;
  backgroundImage: string;
}

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  imagePosition: 'left' | 'right';
  order: number;
  isActive: boolean;
}

interface ServicesSection {
  title: string;
  backgroundImage: string;
  cards: ServiceCard[];
}

interface Foundation {
  title: string;
  description: string;
  order: number;
}

interface FoundationSection {
  title: string;
  backgroundColor: string;
  foundations: Foundation[];
}

interface VideoSection {
  videoSrc: string;
  backgroundColor: string;
}

interface AboutContent {
  heroSection?: HeroSection;
  parallaxSection?: ParallaxSection;
  servicesSection?: ServicesSection;
  foundationSection?: FoundationSection;
  videoSection?: VideoSection;
}

async function fetchAboutContent(): Promise<AboutContent | null> {
  try {
    const response = await fetch('https://admin.vvworx.com/api/about-content/active', {
      cache: 'no-store' // Disable caching for dynamic content
    });

    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();

        console.log('response :', result)
    
    if (result.success) {
      return result.data;
    } else {
      console.warn('No active about content found, using defaults');
      return null;
    }
  } catch (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
}

export default async function Homepage() {
  const aboutContent = await fetchAboutContent();

  return (
    <div>
      <WithGenericLoader>
        <About aboutContent={aboutContent} />
      </WithGenericLoader>
    </div>
  );
}
