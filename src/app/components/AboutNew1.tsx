"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import Link from "next/link";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.vvworx.com/';

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
}

interface ClientItem {
    name: string;
    logo: string;
    order: number;
}

interface ClientContent {
    title: string;
    description: string;
    clients: ClientItem[];
}

// Helper function to resolve image URLs
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

// Helper function to resolve video URLs
const getVideoUrl = (videoPath: string): string => {
    if (!videoPath) return "";

    // If it's already a full URL from backend, use proxy
    if (videoPath.startsWith(API_URL)) {
        return `/api/proxy?url=${encodeURIComponent(videoPath)}`;
    }

    // If it's already an HTTPS URL, return as is
    if (videoPath.startsWith("https://")) return videoPath;

    // If it's an uploaded video (starts with /uploads), serve from backend via proxy
    if (videoPath.startsWith("/uploads/")) {
        const fullUrl = `${API_URL}${videoPath}`;
        return `/api/proxy?url=${encodeURIComponent(fullUrl)}`;
    }

    // For default videos in public folder, serve from frontend
    return videoPath;
};

// TypeScript interfaces for About content
interface HeroSection {
    mainTitle: string;
    rotatingTexts: string[];
    backgroundVideo: string;
    heroImages: string[]; // Changed from object to array
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
    imagePosition: "left" | "right";
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

interface AboutProps {
    aboutContent?: AboutContent;
}

gsap.registerPlugin(ScrollTrigger);

const mapProgress = (progress: number, completeAt = 0.1, from = 0.8, to = -0.5) => {
    if (progress < 0) return from;

    if (progress > completeAt) return to;
    const t = progress / completeAt;
    return from + (to - from) * t;
};

export default function About({ aboutContent }: any) {
    // HeroSection refs
    const heroRef = useRef(null);
    const [showIntro, setShowIntro] = useState(true);
    const introRef = useRef<HTMLDivElement>(null);
    const introTextRef = useRef(null);



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
        } else if (typeof rawHeroSection.heroImages === "object") {
            const oldFormat = rawHeroSection.heroImages as any;
            heroImagesArray = [
                oldFormat.fullService || "/fullservice.jpeg",
                oldFormat.ai || "/ai.jpeg",
                oldFormat.tech || "/tech.jpeg",
                oldFormat.creative || "/creative.jpeg",
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

    // About section refs
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const parallaxContainerRef = useRef(null);

    const videoSectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoMuted, setIsVideoMuted] = useState(true);

    // About scroll section refs
    const aboutScrollSectionRef = useRef<HTMLDivElement>(null);
    const aboutLine1Ref = useRef<HTMLParagraphElement>(null);
    const aboutLine2Ref = useRef<HTMLParagraphElement>(null);
    const aboutLine3Ref = useRef<HTMLParagraphElement>(null);
    const aboutLine4Ref = useRef<HTMLParagraphElement>(null);
    const aboutLine5Ref = useRef<HTMLParagraphElement>(null);
    const aboutButtonRef = useRef<HTMLButtonElement>(null);

    // Foundation scroll section refs
    const foundationTitleRef = useRef<HTMLHeadingElement>(null);
    const foundationItem1Ref = useRef<HTMLDivElement>(null);
    const foundationItem2Ref = useRef<HTMLDivElement>(null);
    const foundationItem3Ref = useRef<HTMLDivElement>(null);
    const foundationItem4Ref = useRef<HTMLDivElement>(null);

    // Our Work horizontal scroll section refs
    const ourWorkSectionRef = useRef<HTMLDivElement>(null);
    const horizontalScrollRef = useRef<HTMLDivElement>(null);

    // About Page Content State (for Foundation Section)
    const [aboutPageData, setAboutPageData] = useState<any>(null);

    // Fetch About Page content from API
    useEffect(() => {
        const fetchAboutPageContent = async () => {
            try {
                const response = await fetch(`${API_URL}/api/about-page-content/active`);
                const result = await response.json();
                if (result.success && result.data) {
                    console.log("Fetched About Page Data:", result.data);
                    setAboutPageData(result.data);
                }
            } catch (error) {
                console.error('Error fetching About Page content:', error);
            }
        };
        fetchAboutPageContent();
    }, []);

    const heroSection = {
        mainTitle: rawHeroSection.mainTitle || "We are",
        rotatingTexts: rotatingTextsArray,
        backgroundVideo: rawHeroSection.backgroundVideo || "/hero.mp4",
        heroImages: heroImagesArray,
    };

    const parallaxSection = aboutContent?.parallaxSection || {
        title: "Your Voice in the Future of Marketing.",
        backgroundImage: "/voice.jpg",
    };

    const servicesSection = aboutContent?.servicesSection || {
        title: "Our Services",
        backgroundImage: "/serviceVector.png",
        cards: [],
    };

    const foundationSection = aboutPageData?.foundationSection || aboutContent?.foundationSection || {
        title: "Our Foundation",
        backgroundColor: "#6310FF",
        foundations: [
            {
                title: "Creativity",
                description: "Creativity that inspires",
                order: 1,
            },
            {
                title: "Innovation",
                description: "Technology that keeps You ahead",
                order: 2,
            },
            {
                title: "Strategic Thinking",
                description: "Strategy that always makes you win",
                order: 3,
            },
            {
                title: "Customer Centricity",
                description: 'Everything is about "You"',
                order: 4,
            },
        ],
    };

    const videoSection = aboutContent?.videoSection || {
        videoSrc: "/vua-intro.mp4",
        backgroundColor: "#EEF0FF",
    };

    // Get sorted cards and foundations
    const sortedCards = servicesSection.cards
        .filter((card: any) => card.isActive)
        .sort((a: any, b: any) => a.order - b.order);

    const sortedFoundations = foundationSection.foundations.sort(
        (a: any, b: any) => a.order - b.order
    );

    // Our Work Content State
    const [ourWorkContent, setOurWorkContent] = useState<OurWorkContent>({
        headerSection: {
            title: "",
            description: "",
            underlineColor: "#007BFF"
        },
        portfolioItems: [],
        footerSection: { buttonText: "" }
    });

    // Fetch Our Work content from API
    useEffect(() => {
        const fetchOurWorkContent = async () => {
            try {
                const response = await fetch(`${API_URL}/api/our-work-content/active`);
                const result = await response.json();
                if (result.success && result.data) {
                    setOurWorkContent(result.data);
                }
            } catch (error) {
                console.error('Error fetching Our Work content:', error);
            }
        };
        fetchOurWorkContent();

    }, []);

    // Client Content State
    const [clientContent, setClientContent] = useState<ClientContent>({
        title: "Our Client",
        description: "At VVWorx, we've had the opportunity to collaborate with brands across real estate, technology, and consumer verticals. Here are some of the amazing clients who trust our work.",
        clients: []
    });

    // Fetch Client content from API
    useEffect(() => {
        const fetchClientContent = async () => {
            try {
                const response = await fetch(`${API_URL}/api/client-content/active`);
                const result = await response.json();
                if (result.success && result.data) {
                    setClientContent(result.data);
                }
            } catch (error) {
                console.error('Error fetching Client content:', error);
            }
        };
        fetchClientContent();
    }, []);



    const sortedPortfolioItems = ourWorkContent.portfolioItems.sort((a, b) => a.order - b.order);

    const maskRef = useRef<SVGRectElement>(null);
    const titleRef = useRef(null);

    // Dynamic card refs
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // animation text intro fade out 
    useEffect(() => {
        if (!introRef.current) return;

        const blocks = introRef.current.querySelectorAll(".intro-block");

        // Show all blocks instantly
        gsap.set(blocks, { y: "0%", scaleY: 1, opacity: 1 });

        // Wait for some time before starting disappearance animation
        const tl = gsap.timeline({
            delay: 2, // wait 2 seconds before animation starts
            onComplete: () => setShowIntro(false),
        });

        blocks.forEach((block, i) => {
            if (i === 0) {
                tl.to(block, { y: "100%", duration: 1.6, ease: "power4.inOut" }, i * 0.12);
            }
            if (i === 1) {
                tl.to(block, { scaleY: 0, duration: 1.6, ease: "power4.inOut" }, i * 0.12);
            }
            if (i === 2) {
                tl.to(block, { y: "-100%", duration: 1.6, ease: "power4.inOut" }, i * 0.12);
            }
            if (i === 3) {
                tl.to(block, { scaleY: 0, duration: 1.6, ease: "power4.inOut" }, i * 0.12);
            }
            if (i === 4) {
                tl.to(block, { y: "100%", duration: 1.6, ease: "power4.inOut" }, i * 0.12);
            }
        });

        // Fade out the entire intro wrapper at the end
        tl.to(
            introRef.current,
            { opacity: 0, duration: 0.4, ease: "power1.out" },
            "-=0.6"
        );
    }, []);





    // Initialize card refs based on sorted cards
    useEffect(() => {
        cardRefs.current = cardRefs.current.slice(0, sortedCards.length);
        for (let i = cardRefs.current.length; i < sortedCards.length; i++) {
            cardRefs.current[i] = null;
        }
    }, [sortedCards.length]);
    const scrollYProgress = useRef(0);

    // Initialize Lenis smooth scrolling
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

    // Hero Section Animation
    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        const heroCtx = gsap.context(() => {
            const heroTl = gsap.timeline({
                scrollTrigger: {
                    // pin the wrapper (see DOM wrapper with id="heroPin")
                    trigger: "#heroPin",
                    start: "top top",
                    end: "+=4000", // Reduced from +=30000 for better UX
                    scrub: 1, // Reduced from 3 for more responsive feel
                    pin: true,
                    anticipatePin: 1,
                    markers: false,
                },
            });

            // Set initial states for hero images (dynamic)
            imageRefs.slice(1).forEach((imgRef) => {
                if (imgRef.current) {
                    gsap.set(imgRef.current, { opacity: 0 });
                }
            });

            // Set initial states for all texts except the first one
            textRefs.forEach((ref: any, index: any) => {
                if (index > 0 && ref.current) {
                    gsap.set(ref.current, { y: "100%", opacity: 0 });
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
                    // Hold phase - keep current text visible for a bit
                    heroTl.to({}, { duration: 0.5 });

                    heroTl.to(currentTextRef.current, {
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

            // Final hold phase - keep the last text visible for a bit
            heroTl.to({}, { duration: 0.5 });
        }, heroRef);

        return () => {
            heroCtx.revert();
        };
        // textRefs and imageRefs are stable arrays; eslint-ignore to avoid unnecessary re-runs
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Parallax Section Animation
    useEffect(() => {
        const parallaxCtx = gsap.context(() => {
            gsap.to(imageRef.current, {
                y: () => (window.innerWidth < 768 ? -80 : -150),
                ease: "none",
                scrollTrigger: {
                    trigger: parallaxContainerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, parallaxContainerRef);

        return () => {
            parallaxCtx.revert();
        };
    }, []);

    // Services Section Animation
    useEffect(() => {
        const servicesCtx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "500%",
                    pin: true,
                    scrub: 1,
                },
            });

            // IMPORTANT: force recalculation so hero pin (which comes after services) will work
            // Calling refresh right after creating the pin ensures ScrollTrigger recalculates offsets
            ScrollTrigger.refresh();

            // Title out
            tl.to(
                titleRef.current,
                {
                    opacity: 0,
                    y: 100,
                    duration: 1,
                    ease: "power3.out",
                },
                0
            );

            // Dynamic cards animation
            cardRefs.current.forEach((cardRef, index) => {
                if (cardRef) {
                    tl.to(
                        cardRef,
                        { top: window.innerWidth < 768 ? "10%" : "20%", duration: 1 },
                        index === 0 ? "-=.9" : "-=.9"
                    );
                    if (index < cardRefs.current.length - 1) {
                        tl.to(cardRef, { scale: 0.5, opacity: 0, duration: 1 });
                    }
                }
            });
        }, sectionRef);

        return () => {
            servicesCtx.revert();
        };
    }, [sortedCards]);

    // Video Section Animation
    useEffect(() => {
        const videoCtx = gsap.context(() => {
            // Video scroll trigger
            ScrollTrigger.create({
                trigger: videoSectionRef.current,
                start: "top 70%",
                end: "bottom 30%",
                onEnter: () => {
                    if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play().catch((e) => console.log("Autoplay prevented:", e));
                    }
                },
                onEnterBack: () => {
                    if (videoRef.current) {
                        videoRef.current.play().catch((e) => console.log("Autoplay prevented:", e));
                    }
                },
                onLeave: () => {
                    if (videoRef.current) {
                        videoRef.current.pause();
                    }
                },
                onLeaveBack: () => {
                    if (videoRef.current) {
                        videoRef.current.pause();
                    }
                },
            });

            // Video scale animation
            gsap.fromTo(
                videoRef.current,
                { scale: 0.9 },
                {
                    scale: 1.1,
                    scrollTrigger: {
                        trigger: videoSectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                }
            );
        }, videoSectionRef);

        return () => {
            videoCtx.revert();
        };
    }, []);

    const toggleVideoMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsVideoMuted(videoRef.current.muted);
        }
    };

    // About Scroll Section Animation
    useEffect(() => {
        const aboutCtx = gsap.context(() => {
            const lineRefs = [
                aboutLine1Ref,
                aboutLine2Ref,
                aboutLine3Ref,
                aboutLine4Ref,
                aboutLine5Ref,
            ];

            // Foundation refs
            const foundationRefs = [
                foundationTitleRef,
                foundationItem1Ref,
                foundationItem2Ref,
                foundationItem3Ref,
                foundationItem4Ref,
            ];

            // Set initial states - all lines hidden below
            lineRefs.forEach((ref) => {
                if (ref.current) {
                    gsap.set(ref.current, { y: 100, opacity: 0 });
                }
            });

            if (aboutButtonRef.current) {
                gsap.set(aboutButtonRef.current, { y: 100, opacity: 0 });
            }

            // Set initial states for foundation
            foundationRefs.forEach((ref) => {
                if (ref.current) {
                    gsap.set(ref.current, { y: 50, opacity: 0 });
                }
            });

            // Create scroll-triggered timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: aboutScrollSectionRef.current,
                    start: "top top",
                    end: "+=3000",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    markers: false,
                },
            });

            // Animate each line progressively (syncing About and Foundation)
            lineRefs.forEach((ref, index) => {
                // Animate About Line
                if (ref.current) {
                    tl.to(
                        ref.current,
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.5,
                            ease: "power2.out",
                        },
                        index * 0.15
                    );
                }

                // Animate Foundation Item (Sync with About lines)
                // We have 5 foundation refs (Title + 4 items) and 5 about lines. Perfect match.
                if (foundationRefs[index]?.current) {
                    tl.to(
                        foundationRefs[index].current,
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.5,
                            ease: "power2.out",
                        },
                        index * 0.15 // Same start time as the corresponding about line
                    );
                }
            });

            // Animate button last
            if (aboutButtonRef.current) {
                tl.to(
                    aboutButtonRef.current,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.out",
                    },
                    "+=0.1"
                );
            }
        }, aboutScrollSectionRef);

        return () => {
            aboutCtx.revert();
        };
    }, []);

    // Our Work Horizontal Scroll Animation
    useEffect(() => {
        const ourWorkCtx = gsap.context(() => {
            if (!horizontalScrollRef.current || !ourWorkSectionRef.current) return;

            // Use matchMedia for responsive animation
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                // Desktop Only Animation
                const scrollWidth = horizontalScrollRef.current!.scrollWidth;
                const viewportWidth = window.innerWidth;

                gsap.to(horizontalScrollRef.current, {
                    x: () => -(scrollWidth - viewportWidth),
                    ease: "none",
                    scrollTrigger: {
                        trigger: ourWorkSectionRef.current,
                        pin: true,
                        scrub: 1,
                        end: () => `+=${horizontalScrollRef.current ? horizontalScrollRef.current.scrollWidth - window.innerWidth : 0}`,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });
            });

            // Force refresh to handle dynamic content retrieval
            ScrollTrigger.refresh();
        }, ourWorkSectionRef); // This closes the gsap.context correctly

        return () => {
            ourWorkCtx.revert();
        };
    }, [sortedPortfolioItems, ourWorkSectionRef]); // This closes the useEffect correctly with dependencies

    return (
        <section>
            {/* Video Section */}
            <section
                ref={videoSectionRef}
                className="relative w-full h-auto md:h-screen flex items-center justify-center overflow-hidden p-0 m-0"
                style={{ backgroundColor: videoSection.backgroundColor }}
            >
                <div className="relative w-full h-full">
                    {showIntro && (
                        <div
                            ref={introRef}
                            className="intro-grid absolute inset-0 z-20 grid grid-cols-5"
                        >
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="intro-block bg-white w-full h-full"></div>
                            ))}

                            <h1
                                ref={introTextRef}
                                className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-semibold text-black"
                            >
                                A creative consulting & branding agency <br /> that helps you cut through the noise.
                            </h1>
                        </div>
                    )}


                    <video
                        ref={videoRef}
                        className="w-full h-auto md:absolute md:inset-0 md:w-full md:h-full md:object-cover md:scale-[0.9]"
                        playsInline
                        loop
                        muted
                        autoPlay
                        preload="auto"
                        src={getVideoUrl(videoSection.videoSrc)}
                    />

                    {/* Sound Toggle Button */}
                    <button
                        onClick={toggleVideoMute}
                        className="absolute top-4 right-4 md:top-8 md:right-8 z-10 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-3 md:p-4 transition-all duration-300 backdrop-blur-sm opacity-70 hover:opacity-90"
                        aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                    >
                        {isVideoMuted ? (
                            // Muted icon
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 md:w-6 md:h-6 text-white"
                            >
                                <path
                                    d="M16.5 12C16.5 10.23 15.5 8.71 14 7.97V9.18L16.45 11.63C16.48 11.86 16.5 12.08 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z"
                                    fill="currentColor"
                                />
                            </svg>
                        ) : (
                            // Unmuted icon
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 md:w-6 md:h-6 text-white"
                            >
                                <path
                                    d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.02C15.5 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12S16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12S18.01 4.14 14 3.23Z"
                                    fill="currentColor"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </section>

            {/* About & Foundation Scroll Section - Pinned with Two-Column Reveal */}
            <section
                ref={aboutScrollSectionRef}
                className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#EEF0FF]"
            >
                <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24">
                    {/* Left Column: Dark About Card */}
                    <div className="w-full md:w-1/2 max-w-[600px] lg:max-w-[700px]">
                        <div
                            className="bg-gradient-to-br from-[#0a0a1a] to-[#1a1a2e] rounded-[20px] md:rounded-[30px] p-8 md:p-12 lg:p-16 shadow-2xl w-full"
                            style={{
                                boxShadow: "0 30px 60px -15px rgba(98, 16, 255, 0.4)",
                            }}
                        >
                            {/* Title */}
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-8 md:mb-12 text-center">
                                About Us
                            </h2>

                            {/* Text Lines Container */}
                            <div className="space-y-3 md:space-y-4 mb-10 md:mb-12 text-center md:text-left">
                                <p
                                    ref={aboutLine1Ref}
                                    className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed"
                                >
                                    Lorem Ipsum Dolor Sit Amet, Consectetuer Adipiscing Elit, Sed
                                </p>
                                <p
                                    ref={aboutLine2Ref}
                                    className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed"
                                >
                                    Diam Nonummy Nibh Euismod Tincidunt Ut Laoreet Dolore Magna
                                </p>
                                <p
                                    ref={aboutLine3Ref}
                                    className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed"
                                >
                                    Aliquam Erat Volutpat. Ut Wisi Enim Ad Minim Veniam, Quis Nostrud
                                </p>
                                <p
                                    ref={aboutLine4Ref}
                                    className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed"
                                >
                                    Exerci Tation Ullamcorper Suscipit Lobortis Nisl Ut Aliquip Ex Ea
                                </p>
                                <p
                                    ref={aboutLine5Ref}
                                    className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed"
                                >
                                    Commodo Consequat.
                                </p>
                            </div>

                            {/* Know More Button */}
                            <div className="flex justify-center md:justify-start">
                                <button
                                    ref={aboutButtonRef}
                                    className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    <span className="text-sm md:text-base font-medium tracking-wider">
                                        KNOW MORE
                                    </span>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 md:w-5 md:h-5"
                                    >
                                        <path
                                            d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Our Foundation */}
                    <div className="w-full md:w-1/2 flex flex-col gap-8 md:gap-12 pl-4 md:pl-0">
                        <h2
                            ref={foundationTitleRef}
                            className="font-semibold text-[40px] md:text-[60px] lg:text-[80px] leading-[1.1] text-[#6210FF]"
                        >
                            Our
                            <br />
                            Foundation
                        </h2>

                        <div className="flex flex-col gap-8 md:gap-10">
                            {/* Item 1 */}
                            <div ref={foundationItem1Ref} className="foundation-item">
                                <h3 className="text-[28px] md:text-[40px] font-semibold text-gray-500 mb-1">
                                    Creativity
                                </h3>
                                <p className="text-[16px] md:text-[18px] text-gray-400 font-light">
                                    Creativity That Inspires
                                </p>
                            </div>

                            {/* Item 2 */}
                            <div ref={foundationItem2Ref} className="foundation-item">
                                <h3 className="text-[28px] md:text-[40px] font-semibold text-gray-500 mb-1">
                                    Innovation
                                </h3>
                                <p className="text-[16px] md:text-[18px] text-gray-400 font-light">
                                    Technology That Keeps You Ahead
                                </p>
                            </div>

                            {/* Item 3 */}
                            <div ref={foundationItem3Ref} className="foundation-item">
                                <h3 className="text-[28px] md:text-[40px] font-semibold text-gray-500 mb-1">
                                    Strategic Thinking
                                </h3>
                                <p className="text-[16px] md:text-[18px] text-gray-400 font-light">
                                    Strategy That Always Makes You Win
                                </p>
                            </div>

                            {/* Item 4 */}
                            <div ref={foundationItem4Ref} className="foundation-item">
                                <h3 className="text-[28px] md:text-[40px] font-semibold text-gray-500 mb-1">
                                    Customer Centricity
                                </h3>
                                <p className="text-[16px] md:text-[18px] text-gray-400 font-light">
                                    Everything Is About "You"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Work Header */}
            <div className="w-full py-20 md:py-32 bg-[#F5F5F7] flex flex-col items-center justify-center text-center px-4">
                <div className="relative mb-8">
                    <h2 className="text-6xl md:text-8xl font-light text-[#6210FF] tracking-tight">
                        {ourWorkContent.headerSection.title}
                    </h2>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#007BFF] rounded-full transform scale-x-100 transition-transform duration-500" />
                </div>
                <p className="text-gray-600 max-w-2xl text-lg md:text-xl leading-relaxed font-light">
                    {ourWorkContent.headerSection.description}
                </p>
            </div>

            {/* Our Work - Responsive Section */}
            <section
                ref={ourWorkSectionRef}
                className="relative w-full min-h-screen bg-[#F5F5F7] md:bg-black overflow-hidden"
            >
                {/* Horizontal Scroll Container (Desktop) */}
                <div
                    ref={horizontalScrollRef}
                    className="hidden md:flex h-screen"
                    style={{ width: `${sortedPortfolioItems.length * 100}vw` }}
                >
                    {sortedPortfolioItems.map((item: PortfolioItem, index: number) => (
                        <div
                            key={`desktop-${index}`}
                            className="relative w-screen h-screen flex-shrink-0"
                        >
                            {/* Image */}
                            <Image
                                src={getImageUrl(item.image)}
                                alt={item.name}
                                fill
                                className="object-cover"
                                unoptimized={true}
                                priority={index === 0}
                            />

                            {/* Overlay for text readability */}
                            <div className="absolute inset-0 bg-black/20" />

                            {/* View More Circle - Centered */}
                            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10">
                                    <span className="text-white text-sm md:text-base font-medium">View More</span>
                                </div>
                            </div> */}

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                    {/* Title (Bottom Left) */}
                                    <h2 className="text-white text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight">
                                        {item.name}
                                    </h2>

                                    {/* Tags (Bottom Right) */}
                                    <div className="flex gap-4">
                                        <span className="px-6 py-2 rounded-full border border-white/30 backdrop-blur-md text-white text-sm md:text-lg">
                                            {item.year}
                                        </span>
                                        <span className="px-6 py-2 rounded-full border border-white/30 backdrop-blur-md text-white text-sm md:text-lg uppercase tracking-wider">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Vertical Stack Container (Mobile) */}
                <div className="flex md:hidden flex-col w-full h-auto px-4 py-8 gap-8 bg-[#EEF0FF]">
                    {sortedPortfolioItems.map((item: PortfolioItem, index: number) => (
                        <div key={`mobile-${index}`} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={getImageUrl(item.image)}
                                alt={item.name}
                                fill
                                className="object-cover"
                                unoptimized={true}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium border border-white/10">
                                        {item.name}
                                    </span>
                                    <span className="text-white text-xs font-light opacity-80">{item.year}</span>
                                </div>

                                <div>
                                    {/* Center Image/Logo if available or Title */}
                                    {/* Assuming title for now as per design intention */}
                                    {/* <h3 className="text-white text-3xl font-bold text-center drop-shadow-lg">{item.name}</h3> */}

                                    <div className="flex justify-center items-center w-full mt-4">
                                        <button className="flex items-center gap-1 text-white text-xs opacity-90 border border-white/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                            Learn more
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Unique "See All Work" Button for Mobile */}
                    <div className="relative z-50 flex justify-center mt-4 pb-8">
                        <Link href="/work" className="flex items-center gap-2 px-6 py-3 bg-white text-[#6210FF] rounded-full shadow-md border border-[#6210FF]/20 cursor-pointer">
                            <span className="text-sm font-bold uppercase tracking-wide">SEE ALL WORK</span>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="transform rotate-90"
                            >
                                <path
                                    d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* See All Work Footer */}
            <div className="w-full py-20 bg-[#F5F5F7] hidden md:flex justify-center items-center">
                <Link href="/work" className="group flex items-center gap-3 px-8 py-4 bg-transparent text-[#6210FF] border-2 border-[#6210FF] rounded-full hover:bg-[#6210FF] hover:text-white transition-all duration-300">
                    <span className="text-lg font-medium tracking-wide uppercase">{ourWorkContent.footerSection.buttonText}</span>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                        <path
                            d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>



            {/* Parallax Section */}
            <section
                ref={parallaxContainerRef}
                className="parallax relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden"
            >
                <div className="relative h-screen w-full flex flex-col justify-center items-center">
                    {/* Parallax Background Image */}
                    <div
                        ref={imageRef}
                        className="absolute top-0 left-0 w-full h-[120%] z-0"
                        style={{
                            backgroundImage: `url('${getImageUrl(parallaxSection.backgroundImage)}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            willChange: "transform",
                        }}
                    ></div>

                    {/* Content */}
                    <h1 className="z-10 relative animate__animated animate__fadeInUp leading-snug text-white text-4xl md:text-8xl font-medium text-center px-4 rounded-lg">
                        {parallaxSection.title.split("\n").map((line: any, index: any) => (
                            <span key={index}>
                                {line}
                                {index < parallaxSection.title.split("\n").length - 1 && <br />}
                            </span>
                        ))}
                    </h1>
                </div>
            </section>

            {/* service section */}
            <section
                ref={sectionRef}
                className="flex min-h-screen overflow-hidden flex-col items-center justify-start bg-[#EEF0FF]"
            >
                <div className="relative" ref={titleRef}>
                    {/* Background Image */}
                    <div className="absolute -top-44 -left-56 -right-56 flex items-center justify-center">
                        <Image
                            src={getImageUrl(servicesSection.backgroundImage)}
                            className="max-w-full h-auto"
                            alt="Decorative background"
                            width={1300}
                            height={600}
                            unoptimized={true}
                        />
                    </div>

                    {/* Text Content */}
                    <h1 className="text-4xl md:text-9xl pt-[20px] md:pt-[40px] text-center font-[500] text-[#6210FF] animate__animated animate__fadeInUp relative z-10 px-4">
                        {servicesSection.title}
                    </h1>
                </div>

                {/* Dynamic Service Cards */}
                {sortedCards.map((card: any, index: any) => (
                    <div
                        key={index}
                        ref={(el) => {
                            cardRefs.current[index] = el;
                        }}
                        className={`absolute ${index === 0 ? "top-[40%]" : "top-[100%]"} z-${index * 10} mb-5 bg-white rounded-[10px] md:rounded-[30px] shadow-lg max-w-[90%] lg:max-w-[800px] xl:max-w-[1100px] 2xl:max-w-[70%] flex flex-col md:flex-row overflow-hidden mx-4 md:mx-0 h-[530px] md:h-[500px]`}
                        style={{ boxShadow: "0 20px 50px -10px rgba(190, 47, 244, 0.3)" }}
                    >
                        <div
                            className={`w-full md:w-1/2 p-4 md:p-10 flex justify-center items-center ${card.imagePosition === "right" ? "order-1" : ""}`}
                        >
                            <Image
                                width={800}
                                height={600}
                                src={getImageUrl(card.image)}
                                alt={card.title}
                                className="w-full h-full object-cover rounded-[10px] md:rounded-[30px]"
                                unoptimized={true}
                            />
                        </div>

                        <div
                            className={`w-full md:w-1/2 p-4 pt-0 ${card.imagePosition === "right" ? "md:pr-0 order-2 md:order-first" : "md:pl-0"} md:p-8 flex flex-col h-full`}
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            <div className="flex-grow">
                                <h2 className="text-3xl md:text-[50px] font-outfit leading-tight text-gray-900 mb-4">
                                    {card.title}
                                </h2>
                                <p className="text-lg sm:text-xl md:text-xl xl:text-2xl leading-tight text-gray-900 mb-6 md:mb-8">
                                    {card.description}
                                </p>
                                <div className="flex flex-wrap gap-2 xl:gap-3 mb-2 xl:mb-6">
                                    {card.tags.map((tag: any, tagIndex: any) => (
                                        <span
                                            key={tagIndex}
                                            className="px-2 py-0 leading-normal xl:leading-relaxed md:px-4 md:py-2 border border-[#6210FF] text-gray-900 rounded-full text-xs xl:text-lg"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto pt-4 md:pt-6 w-full flex md:justify-end justify-start opacity-0">
                                <button className="flex items-center gap-2 px-4 py-2 xl:px-6 xl:py-3 bg-white text-gray-900 border-2 border-[#6210FF] rounded-full hover:bg-gray-50 transition-all duration-200">
                                    <span className="text-xs md:text-sm xl:text-lg font-medium">EXPLORE MORE</span>
                                    <Image src="/curve.png" alt="Arrow icon" className="w-4 h-4 xl:w-8 xl:h-8 object-contain" width={30} height={40} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Our Client Section */}


            {/* Our Client Section */}
            <section className="w-full py-20 md:py-32 bg-[#E8E8ED] overflow-hidden">
                {/* Title & Description */}
                <div className="text-center mb-16 px-4">
                    <h2 className="text-5xl md:text-7xl font-light text-[#6210FF] mb-6 tracking-tight">
                        {clientContent.title}
                    </h2>
                    <p className="text-gray-700 max-w-4xl mx-auto text-base md:text-lg leading-relaxed font-light">
                        {clientContent.description}
                    </p>
                </div>

                {/* Marquee Container */}
                <div className="relative">
                    {/* Gradient Fade Edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-[#E8E8ED] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[#E8E8ED] to-transparent z-10 pointer-events-none" />

                    {/* Marquee Track */}
                    <div className="flex gap-8 md:gap-12 animate-marquee hover:pause-marquee">
                        {/* First Set of Logos */}
                        {(clientContent.clients.length > 0 ? clientContent.clients : [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({ name: `Client Logo ${i}`, logo: "", order: i }))).sort((a: any, b: any) => a.order - b.order).map((client: any, index: number) => (
                            <div
                                key={`client-${index}`}
                                className="flex-shrink-0 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center min-w-[280px] md:min-w-[350px] h-[140px] md:h-[180px] overflow-hidden"
                            >
                                {client.logo ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={getImageUrl(client.logo)}
                                            alt={client.name}
                                            fill
                                            className="object-cover"
                                            unoptimized={true}
                                        />
                                    </div>
                                ) : (
                                    <div className="text-gray-400 text-2xl md:text-3xl font-semibold p-8 md:p-12">
                                        {client.name}
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* Duplicate Set for Seamless Loop */}
                        {(clientContent.clients.length > 0 ? clientContent.clients : [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({ name: `Client Logo ${i}`, logo: "", order: i }))).sort((a: any, b: any) => a.order - b.order).map((client: any, index: number) => (
                            <div
                                key={`client-duplicate-${index}`}
                                className="flex-shrink-0 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center min-w-[280px] md:min-w-[350px] h-[140px] md:h-[180px] overflow-hidden"
                            >
                                {client.logo ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={getImageUrl(client.logo)}
                                            alt={client.name}
                                            fill
                                            className="object-cover"
                                            unoptimized={true}
                                        />
                                    </div>
                                ) : (
                                    <div className="text-gray-400 text-2xl md:text-3xl font-semibold p-8 md:p-12">
                                        {client.name}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Hero pinned wrapper */}
            <section id="heroPin">
                {/* HeroSection */}
                <section ref={heroRef} className="hero-section w-full h-auto min-h-screen relative overflow-hidden bg-black">
                    <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop playsInline>
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

                                        <linearGradient id="overlay_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#6210FF" stopOpacity="0.2" />
                                            <stop offset="100%" stopColor="#BE2FF4" stopOpacity="0.2" />
                                        </linearGradient>

                                        <filter id="grain" x="0" y="0" width="100%" height="100%">
                                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" />
                                            <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.1 0" />
                                        </filter>
                                    </defs>

                                    <path d="M1375.24 0.0751953C1297.95 304.734 1019.35 530.063 687.749 530.063C356.147 530.063 77.2875 304.734 0.261719 0.0751953H283.56C350.664 155.118 506.282 263.906 687.749 263.906C869.217 263.906 1024.83 155.118 1091.94 0.0751953H1375.24Z" fill="url(#overlay_gradient)" />
                                    <rect width="100%" height="100%" fill="url(#overlay_gradient)" filter="url(#grain)" opacity="0.15" />

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
        </section >
    );
}
