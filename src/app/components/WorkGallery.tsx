"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Helper for image URLs (Client Side)
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.vvworx.com').replace(/\/$/, '');

const getMediaUrl = (path: string): string => {
    if (!path) return "";
    if (path.startsWith(API_URL)) return path;
    if (path.startsWith("https://")) return path;
    if (path.startsWith("/uploads/")) {
        return `${API_URL}${path}`;
    }
    return path;
};

/** Returns true if the URL points to a video file */
const isVideoUrl = (url: string): boolean =>
    /\.(mp4|mov|avi|mkv|webm|ogv|3gp|flv)(\?.*)?$/i.test(url);

/** Returns true if the URL points to a YouTube video */
const isYoutubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
};

const getYoutubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

interface WorkGalleryProps {
    images: string[];
}

export default function WorkGallery({ images }: WorkGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % images.length);
        }
    }, [selectedIndex, images.length]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
        }
    }, [selectedIndex, images.length]);

    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "Escape") setSelectedIndex(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, handleNext, handlePrev]);

    if (!images || images.length === 0) return null;

    const selectedMedia = selectedIndex !== null ? images[selectedIndex] : null;
    const selectedIsVideo = selectedMedia ? isVideoUrl(selectedMedia) : false;
    const selectedIsYoutube = selectedMedia ? isYoutubeUrl(selectedMedia) : false;

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
                {images.map((url, idx) => {
                    const isVideo = isVideoUrl(url);
                    const isYoutube = isYoutubeUrl(url);
                    const mediaUrl = getMediaUrl(url);

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
                        <div
                            key={idx}
                            className={className}
                            onClick={() => setSelectedIndex(idx)}
                        >
                            {isYoutube ? (
                                /* ── YOUTUBE THUMBNAIL ── */
                                <>
                                    <Image
                                        src={`https://img.youtube.com/vi/${getYoutubeId(url)}/hqdefault.jpg`}
                                        alt={`YouTube Video ${idx + 1}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        unoptimized
                                    />
                                    {/* Dark scrim + play-button badge */}
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                        <span className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            {/* Play icon */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-6 h-6 text-white translate-x-0.5"
                                            >
                                                <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                            </svg>
                                        </span>
                                    </div>
                                    {/* Video badge */}
                                    <span className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-widest text-white bg-red-600/90 px-2 py-0.5 rounded-full pointer-events-none">
                                        YouTube
                                    </span>
                                </>
                            ) : isVideo ? (
                                /* ── VIDEO THUMBNAIL ── */
                                <>
                                    <video
                                        src={mediaUrl}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        muted
                                        playsInline
                                        preload="metadata"
                                    />
                                    {/* Dark scrim + play-button badge */}
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                        <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            {/* Play icon */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-6 h-6 text-black translate-x-0.5"
                                            >
                                                <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                            </svg>
                                        </span>
                                    </div>
                                    {/* Video badge */}
                                    <span className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-widest text-white bg-black/60 px-2 py-0.5 rounded-full pointer-events-none">
                                        Video
                                    </span>
                                </>
                            ) : (
                                /* ── IMAGE THUMBNAIL ── */
                                <>
                                    <Image
                                        src={mediaUrl}
                                        alt={`Gallery image ${idx + 1}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* ── LIGHTBOX MODAL ── */}
            {selectedIndex !== null && selectedMedia && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={() => setSelectedIndex(null)}
                >
                    <div
                        className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedIsYoutube ? (
                            /* ── YOUTUBE LIGHTBOX ── */
                            <iframe
                                src={`https://www.youtube.com/embed/${getYoutubeId(selectedMedia!)}?autoplay=1`}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                className="w-full max-w-5xl h-[80vh] rounded-xl shadow-2xl outline-none"
                                style={{ background: "#000" }}
                            />
                        ) : selectedIsVideo ? (
                            /* ── VIDEO LIGHTBOX ── */
                            <video
                                src={getMediaUrl(selectedMedia)}
                                controls
                                autoPlay
                                className="max-w-full max-h-[80vh] rounded-xl shadow-2xl outline-none"
                                style={{ background: "#000" }}
                            />
                        ) : (
                            /* ── IMAGE LIGHTBOX ── */
                            <div className="relative w-full h-full">
                                <Image
                                    src={getMediaUrl(selectedMedia)}
                                    alt="Preview"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    {images.length > 1 && (
                        <>
                            {/* Previous Button */}
                            <button
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50 p-3 bg-black/50 rounded-full transition-all hover:scale-110 active:scale-95 group"
                                onClick={handlePrev}
                                aria-label="Previous Image"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-8 h-8 group-hover:-translate-x-0.5 transition-transform"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            {/* Next Button */}
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50 p-3 bg-black/50 rounded-full transition-all hover:scale-110 active:scale-95 group"
                                onClick={handleNext}
                                aria-label="Next Image"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-8 h-8 group-hover:translate-x-0.5 transition-transform"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2 bg-black/50 rounded-full"
                        onClick={() => setSelectedIndex(null)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
}
