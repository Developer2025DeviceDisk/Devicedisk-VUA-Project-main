"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";
import Lenis from "@studio-freight/lenis";

const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return '';

    // If it's already a full URL from backend, use proxy
    if (imagePath.startsWith('https://admin.vvworx.com/')) {
        return `/api/proxy?url=${encodeURIComponent(imagePath)}`;
    }

    // If it's already an HTTPS URL, return as is
    if (imagePath.startsWith('https://')) return imagePath;

    // If it's an uploaded image (starts with /uploads), serve from backend via proxy
    if (imagePath.startsWith('/uploads/')) {
        const fullUrl = `https://admin.vvworx.com${imagePath}`;
        return `/api/proxy?url=${encodeURIComponent(fullUrl)}`;
    }

    // For default images in public folder, serve from frontend
    return imagePath;
};

const getVideoUrl = (videoPath: string): string => {
    if (!videoPath) return '';

    // If it's already a full URL from backend, use proxy
    if (videoPath.startsWith('https://admin.vvworx.com/')) {
        return `/api/proxy?url=${encodeURIComponent(videoPath)}`;
    }

    // If it's already an HTTPS URL, return as is
    if (videoPath.startsWith('https://')) return videoPath;

    // If it's an uploaded video (starts with /uploads), serve from backend via proxy
    if (videoPath.startsWith('/uploads/')) {
        const fullUrl = `https://admin.vvworx.com${videoPath}`;
        return `/api/proxy?url=${encodeURIComponent(fullUrl)}`;
    }

    // For default videos in public folder, serve from frontend
    return videoPath;
};

interface HeroSection {
    mainTitle: string;
    rotatingTexts: string[];
    backgroundVideo: string;
    heroImages: string[]; // Changed from object to array
}

gsap.registerPlugin(ScrollTrigger);

const mapProgress = (
    progress: number,
    completeAt = 0.1,
    from = 0.8,
    to = -0.5
) => {
    if (progress < 0) return from;

    if (progress > completeAt) return to;
    const t = progress / completeAt;
    return from + (to - from) * t;
};


export default function HeroSection({ aboutContent }: any) {
    const heroRef = useRef(null);

    // Extract content first to determine number of rotating texts and hero images
    const rawHeroSection = aboutContent?.heroSection || {};
    const rotatingTextsArray = rawHeroSection.rotatingTexts || [
        "Full-Service",
        "AI Infused",
        "Mar-Tech",
        "Creative",
    ];

    // Handle backwards compatibility for heroImages (object vs array)
    let heroImagesArray: string[] = [];
    if (rawHeroSection.heroImages) {
        if (Array.isArray(rawHeroSection.heroImages)) {
            heroImagesArray = rawHeroSection.heroImages;
        } else if (typeof rawHeroSection.heroImages === 'object') {
            const oldFormat = rawHeroSection.heroImages as any;
            heroImagesArray = [
                oldFormat.fullService || "/fullservice.jpeg",
                oldFormat.ai || "/ai.jpeg",
                oldFormat.tech || "/tech.jpeg",
                oldFormat.creative || "/creative.jpeg"
            ];
        }
    } else {
        heroImagesArray = ["/fullservice.jpeg", "/ai.jpeg", "/tech.jpeg", "/creative.jpeg"];
    }

    // Create dynamic refs based on number of rotating texts
    const textRefs = useMemo(() => {
        return rotatingTextsArray.map(() => ({ current: null }));
    }, [rotatingTextsArray.length]);

    // Create dynamic refs based on number of hero images
    const imageRefs = useMemo(() => {
        return heroImagesArray.map(() => ({ current: null }));
    }, [heroImagesArray.length]);

    const heroSection = {
        mainTitle: rawHeroSection.mainTitle || "We are",
        rotatingTexts: rotatingTextsArray,
        backgroundVideo: rawHeroSection.backgroundVideo || "/hero.mp4",
        heroImages: heroImagesArray,
    };

    useEffect(() => {
        let lenis: any = null;
        lenis = new Lenis();
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        return () => {
            if (lenis) {
                lenis.destroy();
            }
        };
    }, []);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        const heroCtx = gsap.context(() => {
            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: isMobile ? '+=2000' : '+=4000',
                    scrub: isMobile ? 0.5 : 1,
                    pin: true,
                    anticipatePin: 1,
                    markers: false,
                },
            });

            // Set initial states for hero images (dynamic)
            imageRefs.slice(1).forEach(imgRef => {
                if (imgRef.current) {
                    gsap.set(imgRef.current, { opacity: 0 });
                }
            });

            // Set initial states for all texts except the first one
            textRefs.forEach((ref: any, index: any) => {
                if (index > 0 && ref.current) {
                    gsap.set(ref.current, { y: '100%', opacity: 0 });
                }
            });

            // Dynamic animation loop - works with any number of rotating texts and images
            const maxAnimations = textRefs.length - 1; // Animate all texts except the first

            for (let i = 0; i < maxAnimations; i++) {
                const currentTextRef = textRefs[i];
                const nextTextRef = textRefs[i + 1];
                // Cycle through available images if there are more texts than images
                const currentImageRef = imageRefs[i % imageRefs.length];
                const nextImageRef = imageRefs[(i + 1) % imageRefs.length];

                if (currentTextRef?.current && nextTextRef?.current) {
                    heroTl
                        .to(currentTextRef.current, {
                            y: "-100%",
                            opacity: 0,
                            duration: isMobile ? 0.4 : 0.6,
                            ease: "power2.inOut",
                        });

                    // Animate current image if it exists
                    if (currentImageRef?.current) {
                        heroTl.to(
                            currentImageRef.current,
                            {
                                opacity: 0,
                                duration: isMobile ? 0.4 : 0.6,
                                ease: "power2.inOut",
                            },
                            "<"
                        );
                    }

                    heroTl.to(
                        nextTextRef.current,
                        {
                            y: "0%",
                            opacity: 1,
                            duration: isMobile ? 0.4 : 0.6,
                            ease: "power2.inOut",
                        },
                        "<0.1"
                    );

                    // Animate next image if it exists
                    if (nextImageRef?.current) {
                        heroTl.to(
                            nextImageRef.current,
                            {
                                opacity: 1,
                                duration: isMobile ? 0.4 : 0.6,
                                ease: "power2.inOut",
                            },
                            "<"
                        );
                    }
                }
            }
        }, heroRef);

        return () => {
            heroCtx.revert();
        };
    }, [textRefs, imageRefs]);

    return (
        <>
            <section>
                <section
                    ref={heroRef}
                    className="hero-section w-full h-auto min-h-screen relative overflow-hidden bg-black"
                >
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src={getVideoUrl(heroSection.backgroundVideo)} type="video/mp4" />
                    </video>

                    <div className="mx-auto h-full flex flex-col lg:flex-row md:items-center justify-center px-0 mt-[4rem] md:mt-0 items-end relative z-10">
                        <div className="w-full lg:w-6/12 h-auto flex flex-col sm:mt-20 items-center lg:items-start justify-center py-8 md:pl-32 lg:py-0 pl-8">
                            <h2 className="w-full text-[44px] xs:text-6xl sm:text-7xl lg:text-[50px] xl:text-[80px] 2xl:text-[114px] text-white leading-[1.1] font-medium">
                                {heroSection.mainTitle}
                            </h2>

                            <div className="martech-wrapper w-full relative overflow-hidden h-[72px] xs:h-[84px] sm:h-[102px] md:h-[180px]">
                                {heroSection.rotatingTexts.map((text: any, idx: any) => (
                                    <span
                                        key={idx}
                                        ref={textRefs[idx]}
                                        className="absolute top-0 left-0 w-full font-extrabold bg-gradient-to-r from-[#BE2FF4] to-[#6210FF] text-transparent bg-clip-text text-[50px] xs:text-6xl sm:text-7xl md:text-8xl lg:text-[60px] xl:text-[90px] 2xl:text-[110px] leading-[1.2] inline-block"
                                        style={{
                                            opacity: idx === 0 ? 1 : 0,
                                            transform: idx === 0 ? "translateY(0)" : "translateY(100%)",
                                        }}
                                    >
                                        {text}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-6/12 pl-4 sm:pl-0.5 md:pl-0 h-auto lg:h-full flex items-center justify-center relative">
                            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-full flex justify-center items-center lg:items-end relative">
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 798 531"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="xMidYMid meet"
                                    className="overflow-visible max-w-[600px] lg:max-w-none"
                                >
                                    <defs>
                                        <clipPath id="image_clip_path">
                                            <path d="M1375.24 0.0751953C1297.95 304.734 1019.35 530.063 687.749 530.063C356.147 530.063 77.2875 304.734 0.261719 0.0751953H283.56C350.664 155.118 506.282 263.906 687.749 263.906C869.217 263.906 1024.83 155.118 1091.94 0.0751953H1375.24Z" />
                                        </clipPath>

                                        <linearGradient
                                            id="overlay_gradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                        >
                                            <stop offset="0%" stopColor="#6210FF" stopOpacity="0.2" />
                                            <stop offset="100%" stopColor="#BE2FF4" stopOpacity="0.2" />
                                        </linearGradient>

                                        <filter id="grain" x="0" y="0" width="100%" height="100%">
                                            <feTurbulence
                                                type="fractalNoise"
                                                baseFrequency="0.8"
                                                numOctaves="1"
                                            />
                                            <feColorMatrix
                                                type="matrix"
                                                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.1 0"
                                            />
                                        </filter>
                                    </defs>

                                    <path
                                        d="M1375.24 0.0751953C1297.95 304.734 1019.35 530.063 687.749 530.063C356.147 530.063 77.2875 304.734 0.261719 0.0751953H283.56C350.664 155.118 506.282 263.906 687.749 263.906C869.217 263.906 1024.83 155.118 1091.94 0.0751953H1375.24Z"
                                        fill="url(#overlay_gradient)"
                                    />
                                    <rect
                                        width="100%"
                                        height="100%"
                                        fill="url(#overlay_gradient)"
                                        filter="url(#grain)"
                                        opacity="0.15"
                                    />

                                    {heroSection.heroImages.map((imagePath, index) => (
                                        <image
                                            key={`hero-image-${index}`}
                                            ref={imageRefs[index]}
                                            href={getImageUrl(imagePath)}
                                            width="120%"
                                            height="100%"
                                            clipPath="url(#image_clip_path)"
                                            preserveAspectRatio="xMidYMid slice"
                                            style={{ opacity: index === 0 ? 1 : 0 }}
                                        />
                                    ))}
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}