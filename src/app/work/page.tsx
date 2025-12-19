import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Work | VVWorx',
    description: 'Explore our portfolio of creative, branding, and martech projects.',
};

// Helper function to resolve image URLs (copied from About.tsx for consistency)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.vvworx.com';

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
        <div className="min-h-screen bg-[#EEF0FF]">
            {/* Header Section */}
            <section className="relative w-full h-[350px] md:h-[450px] bg-gradient-to-br from-[#6210FF] to-[#3B00D9] overflow-hidden flex items-center justify-center text-center px-4">
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

            {/* Filters Section */}
            <section className="py-10 px-4 flex justify-center flex-wrap gap-3 md:gap-4 max-w-6xl mx-auto">
                {filters.map((filter, index) => (
                    <button
                        key={index}
                        className={`px-5 py-2 md:px-6 md:py-2.5 rounded-full border text-xs md:text-sm font-medium transition-all duration-300 ${index === 0
                            ? 'bg-[#E0DAFF] border-[#6210FF] text-[#6210FF] shadow-sm'
                            : 'bg-transparent border-[#6210FF] text-[#6210FF] hover:bg-[#E0DAFF] hover:border-[#6210FF]'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </section>

            {/* Description Text */}
            <section className="pb-16 px-4 text-center max-w-4xl mx-auto">
                <p className="text-[#6210FF] text-[10px] md:text-xs leading-relaxed tracking-widest opacity-70 uppercase font-medium whitespace-pre-line">
                    {workPageData.description}
                </p>
            </section>


            {/* Portfolio Grid */}
            <section className="px-4 md:px-8 pb-32 max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
                    {portfolioItems.map((item, index) => {
                        // Determine layout pattern matching the visual:
                        // 0 -> Full Width (Landscape)
                        // 1, 2 -> Half Width (Portrait/Square)
                        // Repeat

                        const isFullWidth = index % 3 === 0;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center ${isFullWidth ? 'md:col-span-2' : 'md:col-span-1'
                                    }`}
                            >
                                {/* Image Container */}
                                <div className={`relative w-full overflow-hidden rounded-[20px] md:rounded-[40px] shadow-sm mb-6 ${isFullWidth ? 'aspect-[2/1] md:aspect-[2.2/1]' : 'aspect-[4/3] md:aspect-[1.5/1]'
                                    }`}>
                                    <Image
                                        src={getImageUrl(item.image)}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                        unoptimized={true}
                                    />
                                </div>

                                {/* Text Content - Below Image */}
                                <div className="text-center space-y-2">
                                    <h3 className="text-[#6210FF] font-bold text-xs md:text-sm tracking-[0.2em] uppercase">
                                        {item.name}
                                    </h3>
                                    <p className="text-[#6210FF] text-[10px] md:text-xs font-light opacity-70 tracking-wide max-w-md mx-auto">
                                        {/* Simulating description using category/year available data */}
                                        Is a New-Age {item.category} Firm That Specializes in Sales & Marketing
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Gallery Section */}
            {workPageData.galleryImages && workPageData.galleryImages.length > 0 && (
                <section className="px-4 md:px-8 pb-32 max-w-[1200px] mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#6210FF] text-center mb-16 tracking-tight">
                        Our Gallery
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        {workPageData.galleryImages.map((img, index) => (
                            <div key={index} className="relative w-full aspect-square rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <Image
                                    src={getImageUrl(img)}
                                    alt={`Gallery Image ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                    unoptimized
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Contact CTA is handled by FooterWrapper globally */}
        </div>
    );
}
