"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Helper function to resolve image URLs
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

interface WorkPageData {
    bannerImage: string;
    mainTitle: string;
    description: string;
    filters: string[];
    galleryImages?: string[];
}

interface WorkPortfolioProps {
    workPageData: WorkPageData;
    portfolioItems: PortfolioItem[];
    defaultFilters: string[];
}

export default function WorkPortfolio({ workPageData, portfolioItems, defaultFilters }: WorkPortfolioProps) {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filters = workPageData.filters && workPageData.filters.length > 0 ? workPageData.filters : defaultFilters;

    const filteredItems = portfolioItems.filter(item => {
        if (selectedCategory === "All") return true;
        // Case-insensitive comparison could be safer, but exact match is standard.
        // Trimming whitespace from data just in case.
        return item.category?.trim() === selectedCategory;
    });

    return (
        <>
            {/* Filters Section */}
            <section className="py-10 px-4 flex justify-center flex-wrap gap-3 md:gap-4 max-w-6xl mx-auto">
                {filters.map((filter, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedCategory(filter)}
                        className={`px-5 py-2 md:px-6 md:py-2.5 rounded-full border text-xs md:text-sm font-medium transition-all duration-300 ${selectedCategory === filter
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
                    {filteredItems.map((item, index) => {
                        // Determine layout pattern matching the visual:
                        // 0 -> Full Width (Landscape)
                        // 1, 2 -> Half Width (Portrait/Square)
                        // Repeat

                        // Note: The layout pattern relies on the index in the *displayed* list.
                        // If we filter, the indices change, so the layout might shift. 
                        // This uses the index within filteredItems, which is usually desired behavior for grids.

                        const isFullWidth = index % 3 === 0;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center ${isFullWidth ? 'md:col-span-2' : 'md:col-span-1'
                                    }`}
                            >
                                {/* Image Container */}
                                <div className={`relative w-full overflow-hidden rounded-[20px] md:rounded-[40px] shadow-sm mb-6 group ${isFullWidth ? 'aspect-[2/1] md:aspect-[2.2/1]' : 'aspect-[4/3] md:aspect-[1.5/1]'
                                    }`}>
                                    <Image
                                        src={getImageUrl(item.image)}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        unoptimized={true}
                                    />

                                    {/* Hover Overlay with View More Button */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                                        <Link
                                            href={item._id ? `/work-detail/${item._id}` : "#"}
                                            className="px-6 py-3 bg-white text-[#6210FF] rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#6210FF] hover:text-white"
                                        >
                                            VIEW MORE
                                        </Link>
                                    </div>
                                </div>

                                {/* Text Content - Below Image */}
                                {/* Text Content - Below Image */}
                                <div className="text-center flex flex-col items-center">
                                    <h3
                                        className="text-[#6210FF] font-semibold text-[18.77px] leading-[1.2] tracking-[0.08em] uppercase text-center mb-[23.65px]"
                                        style={{ fontFamily: "'Outfit', sans-serif" }}
                                    >
                                        {item.name}
                                    </h3>
                                    <p
                                        className="text-[#6210FF] font-light text-[18.77px] leading-[1.2] tracking-[0.08em] text-center max-w-md mx-auto opacity-70"
                                        style={{ fontFamily: "'Outfit', sans-serif" }}
                                    >
                                        {/* Simulating description using category/year available data */}
                                        Is a New-Age {item.category} Firm That Specializes in Sales & Marketing
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    {filteredItems.length === 0 && (
                        <div className="col-span-full text-center py-20">
                            <p className="text-[#6210FF] opacity-70">No projects found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Gallery Section */}
            {/* {workPageData.galleryImages && workPageData.galleryImages.length > 0 && (
                <section className="px-4 md:px-8 pb-32 max-w-[1200px] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#6210FF] text-center mb-16 tracking-tight">
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
            )} */}
        </>
    );
}
