import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import WorkGallery from '@/app/components/WorkGallery';

// Helper for image URLs
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.vvworx.com').replace(/\/$/, '');

const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return "";
    if (imagePath.startsWith(API_URL)) return imagePath;
    if (imagePath.startsWith("https://")) return imagePath;
    if (imagePath.startsWith("/uploads/")) {
        return `${API_URL}${imagePath}`;
    }
    return imagePath;
};

interface PortfolioItem {
    name: string;
    category: string;
    year: string;
    image: string;
    order: number;
    _id?: string;
    // New Fields
    detailTitle?: string;
    detailDescription?: string;
    tags?: string[];
    clientLogo?: string;
    bannerImage?: string;
    galleryImages?: string[];
}

async function getWorkItem(id: string): Promise<PortfolioItem | null> {
    try {
        const response = await fetch(`${API_URL}/api/our-work-content/active`, {
            cache: 'no-store'
        });

        if (!response.ok) return null;

        const result = await response.json();
        if (!result.success || !result.data) return null;

        const items: PortfolioItem[] = result.data.portfolioItems;
        return items.find(item => item._id === id) || null;
    } catch (error) {
        console.error("Error fetching work item:", error);
        return null;
    }
}

export default async function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getWorkItem(id);

    if (!item) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#F8F9FF] text-black"> {/* Light background matching Visionstone feel */}
            {/* Navigation */}
            {/* <div className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference text-white">
                <Link href="/" className="text-xl font-bold tracking-widest">VVWORX</Link>
                <Link
                    href="/newhomepage"
                    className="w-10 h-10 flex items-center justify-center border border-white/30 rounded-full hover:bg-white hover:text-black transition-all"
                >
                    <span className="sr-only">Close</span>
                    ✕
                </Link>
            </div> */}

            {/* Header / Hero Section */}
            <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center text-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={getImageUrl(item.bannerImage || item.image)}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                    {/* Dark Overlay for text readability */}
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative z-10 px-6 max-w-7xl mx-auto flex flex-col md:items-center">
                    <span className="text-sm md:text-base tracking-[0.2em] text-gray-200 mb-4 uppercase">Case Study</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-8 max-w-4xl mx-auto">
                        {item.detailTitle || item.name}
                    </h1>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            {item.tags.map((tag, idx) => (
                                <span key={idx} className="px-4 py-1.5 rounded-full border border-white/30 text-white text-sm md:text-base font-light font-sans backdrop-blur-md bg-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Content & Context Section */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
                <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
                    {/* Left: Client Logo (Separate White Box) */}
                    <div className="w-full md:w-5/20 flex-shrink-0">
                        <div className="bg-white rounded-[40px] p-2 md:p-4 shadow-sm aspect-square flex items-center justify-center">
                            {item.clientLogo ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={getImageUrl(item.clientLogo)}
                                        alt="Client Logo"
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                            ) : (
                                // Fallback
                                <div className="text-3xl font-bold text-gray-900 text-center">{item.name}</div>
                            )}
                        </div>
                    </div>

                    {/* Right: Description (Text on Background) */}
                    <div className="w-full md:w-7/12">
                        <div className="prose prose-lg text-[#1A1A1A] leading-relaxed font-normal">
                            <p className="whitespace-pre-line text-lg md:text-xl md:leading-[1.6]">
                                {item.detailDescription || "No detailed description available for this project yet."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
                {(item.galleryImages && item.galleryImages.length > 0) ? (
                    <WorkGallery images={item.galleryImages} />
                ) : (
                    // Fallback to main image if gallery is empty
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg max-w-4xl mx-auto">
                        <Image
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                )}
            </section>
        </div>
    );
}
