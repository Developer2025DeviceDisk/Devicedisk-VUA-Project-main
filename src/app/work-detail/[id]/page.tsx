import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
            <section className="relative w-full pt-32 pb-20 px-6 md:px-12 bg-[#050511] text-white overflow-hidden">
                {/* Background gradient effect */}
                <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[40vh] h-[40vh] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:items-center text-center">
                    <span className="text-sm md:text-base tracking-[0.2em] text-gray-400 mb-4 uppercase">Case Study</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8 max-w-4xl mx-auto">
                        {item.detailTitle || item.name}
                    </h1>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            {item.tags.map((tag, idx) => (
                                <span key={idx} className="px-4 py-1.5 rounded-full border border-white/20 text-sm md:text-base font-light font-sans backdrop-blur-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Content & Context Section */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-12 md:gap-24 items-start">
                    {/* Left: Client Logo */}
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        {item.clientLogo ? (
                            <div className="relative w-full aspect-[3/2] md:aspect-square max-w-[200px] flex items-center justify-center bg-gray-50 rounded-xl p-6">
                                <Image
                                    src={getImageUrl(item.clientLogo)}
                                    alt="Client Logo"
                                    width={200}
                                    height={200}
                                    className="object-contain w-full h-full"
                                    unoptimized
                                />
                            </div>
                        ) : (
                            // Fallback if no logo
                            <div className="text-2xl font-bold text-gray-900">{item.name}</div>
                        )}
                    </div>

                    {/* Right: Description */}
                    <div className="w-full md:w-2/3">
                        <div className="prose prose-lg text-gray-600 leading-relaxed font-light">
                            <p className="whitespace-pre-line text-lg md:text-xl">
                                {item.detailDescription || "No detailed description available for this project yet."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
                {(item.galleryImages && item.galleryImages.length > 0) ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
                        {item.galleryImages.map((img, idx) => {
                            // Custom Layout Logic matching the "Visionstone" design
                            // 0: Tall Left   | 1: Wide Top Right
                            //                | 2: Small | 3: Small
                            // 4: Wide Left   | 5: Tall Right
                            // 6: Wide Left   | 7: Tall Right

                            let className = "relative rounded-2xl overflow-hidden shadow-sm bg-gray-100 group";

                            // Define grid spans based on index (looping every 8 items or fixed for first few)
                            const patternIndex = idx % 8;

                            if (patternIndex === 0) {
                                className += " md:row-span-2"; // Tall Left
                            } else if (patternIndex === 1) {
                                className += " md:col-span-2"; // Wide Top Right
                            } else if (patternIndex === 4 || patternIndex === 6) {
                                className += " md:col-span-2"; // Wide Lefts
                            } else {
                                className += ""; // Default 1x1
                            }

                            return (
                                <div key={idx} className={className}>
                                    <Image
                                        src={getImageUrl(img)}
                                        alt={`Gallery image ${idx + 1}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        unoptimized
                                    />
                                </div>
                            );
                        })}
                    </div>
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
