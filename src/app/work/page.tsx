import Image from 'next/image';
import { Metadata } from 'next';
import WorkPortfolio from './WorkPortfolio';

export const metadata: Metadata = {
    title: 'Our Work | VVWorx',
    description: 'Explore our portfolio of creative, branding, and martech projects.',
};

// Helper function to resolve image URLs (copied from About.tsx for consistency)
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.vvworx.com').replace(/\/$/, '');

const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return "";

    // If it's already a full URL from backend, use proxy
    if (imagePath.startsWith(API_URL)) {
        return `/api/proxy?url=${encodeURIComponent(imagePath)}`;
    }

    // If it's already an HTTPS URL, return as is
    if (imagePath.startsWith("https://")) return imagePath;

    // If it's an uploaded image (starts with /uploads), serve from backend via proxy
    if (imagePath.startsWith("/uploads/")) {
        const fullUrl = `${API_URL}${imagePath}`;
        return `/api/proxy?url=${encodeURIComponent(fullUrl)}`;
    }

    // For default images in public folder, serve from frontend
    return imagePath;
};

interface PortfolioItem {
    name: string;
    category: string;
    year: string;
    image: string;
    order: number;
    _id?: string;
}

interface OurWorkContent {
    headerSection: {
        title: string;
        description: string;
        underlineColor: string;
    };
    portfolioItems: PortfolioItem[];
    footerSection: {
        buttonText: string;
    };
    workPageSection?: {
        bannerImage: string;
        mainTitle: string;
        description: string;
        filters: string[];
        galleryImages?: string[];
    };
}

async function fetchOurWorkContent(): Promise<OurWorkContent | null> {
    try {
        const response = await fetch(`${API_URL}/api/our-work-content/active`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.success ? result.data : null;
    } catch (error) {
        console.error('Error fetching Our Work content:', error);
        return null;
    }
}

// Fallback defaults
const defaultFilters = [
    "All",
    "Branding & Design",
    "Strategy",
    "Content & Production",
    "AI Videos",
    "UI Design"
];

export default async function WorkPage() {
    const content = await fetchOurWorkContent();

    const portfolioItems = content?.portfolioItems.sort((a, b) => a.order - b.order) || [];

    // Dynamic content with fallbacks
    const workPageData = content?.workPageSection || {
        bannerImage: "/serviceVector.png",
        mainTitle: "From Brief \n To Brilliance",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit!",
        filters: defaultFilters
    };

    const filters = workPageData.filters && workPageData.filters.length > 0 ? workPageData.filters : defaultFilters;

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section - Dark Background */}
            <section className="relative w-full h-[350px] md:h-[450px] bg-gradient-to-br from-[#6210FF] to-[#3B00D9] overflow-hidden flex items-center justify-center text-center px-4 shrink-0">
                {/* Abstract Background pattern */}
                <div className="absolute inset-0 opacity-20 transform scale-110">
                    <Image
                        src={getImageUrl(workPageData.bannerImage)}
                        alt="Background Pattern"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-medium text-white leading-[1.1] tracking-tight drop-shadow-sm whitespace-pre-line">
                        {workPageData.mainTitle}
                    </h1>
                </div>

                {/* Circular Icon Top Right */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10 w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/40 flex items-center justify-center">
                    <div className="w-6 md:w-8 h-0.5 bg-white"></div>
                </div>
            </section>

            {/* Content Section - Light Background */}
            <div className="bg-[#EEF0FF] flex-1 w-full">
                {/* Client Side Portfolio (Filters + Grid + Gallery) */}
                <WorkPortfolio
                    workPageData={workPageData}
                    portfolioItems={portfolioItems}
                    defaultFilters={defaultFilters}
                />
            </div>

            {/* Contact CTA is handled by FooterWrapper globally */}
        </div>
    );
}
