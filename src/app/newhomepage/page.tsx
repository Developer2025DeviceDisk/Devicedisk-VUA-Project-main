import AboutNew1 from "../components/AboutNew1";
import { WithGenericLoader } from "../components/Loader";

export const dynamic = 'force-dynamic';

// TypeScript interfaces for About content
interface HeroSection {
    mainTitle: string;
    rotatingTexts: string[];
    backgroundVideo: string;
    heroImages: string[];
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
        // const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.vvworx.com').replace(/\/$/, '');
        const response = await fetch(`${API_URL}/api/about-content/active`, {
            cache: 'no-store' // Disable caching for dynamic content
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

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

export default async function NewHomePage() {
    const aboutContent = await fetchAboutContent();
    return (
        <WithGenericLoader>
            <AboutNew1 aboutContent={aboutContent} />
        </WithGenericLoader>
    );
}
