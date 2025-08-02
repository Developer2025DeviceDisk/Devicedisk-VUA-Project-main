"use client";
import { useEffect, useState } from "react";
import About from "./components/About";
import { WithGenericLoader } from "./components/Loader";

// TypeScript interfaces for About content
interface HeroImages {
  fullService: string;
  ai: string;
  tech: string;
  creative: string;
}

interface HeroSection {
  mainTitle: string;
  rotatingTexts: string[];
  backgroundVideo: string;
  heroImages: HeroImages;
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

export default function Homepage() {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/about-content/active');
        const result = await response.json();
        
        if (result.success) {
          setAboutContent(result.data);
        } else {
          console.warn('No active about content found, using defaults');
          setAboutContent(null);
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
        setAboutContent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <WithGenericLoader>
        <About aboutContent={aboutContent} />
      </WithGenericLoader>
    </div>
  );
}
