"use client";

import { useState } from "react";
import Image from "next/image";

// Helper for image URLs (Client Side)
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

interface WorkGalleryProps {
    images: string[];
}

export default function WorkGallery({ images }: WorkGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // If no images or empty array, return nothing (or handle upstream)
    if (!images || images.length === 0) return null;

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
                {images.map((img, idx) => {
                    // Custom Layout Logic matching the "Visionstone" design
                    let className = "relative rounded-2xl overflow-hidden shadow-sm bg-gray-100 group cursor-pointer";

                    const patternIndex = idx % 8;

                    if (patternIndex === 0) {
                        className += " md:row-span-2"; // Tall Left
                    } else if (patternIndex === 1) {
                        className += " md:col-span-2"; // Wide Top Right
                    } else if (patternIndex === 4 || patternIndex === 6) {
                        className += " md:col-span-2"; // Wide Lefts
                    }

                    return (
                        <div key={idx} className={className} onClick={() => setSelectedImage(img)}>
                            <Image
                                src={getImageUrl(img)}
                                alt={`Gallery image ${idx + 1}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                unoptimized
                            />
                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                    );
                })}
            </div>

            {/* Modal Overlay */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
                        <Image
                            src={getImageUrl(selectedImage)}
                            alt="Preview"
                            fill
                            className="object-contain"
                            unoptimized
                        />
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2 bg-black/50 rounded-full"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
