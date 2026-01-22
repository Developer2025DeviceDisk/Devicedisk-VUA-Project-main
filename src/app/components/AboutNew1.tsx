"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import Link from "next/link";
import InstagramFeed from "./InstagramFeed";
import OurClient from "./OurClient";
import AboutFoundation from "./AboutFoundation";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.vvworx.com').replace(/\/$/, '');

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
    aboutTitle?: string;
    aboutTextLines?: string[];
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

export default function About({ aboutContent, servicesData }: any) {
    // HeroSection refs
    const heroRef = useRef(null);
    const [showIntro, setShowIntro] = useState(true);
    const introRef = useRef<HTMLDivElement>(null);
    const introTextRef = useRef<HTMLHeadingElement>(null);
    const introOverlayRef = useRef<HTMLDivElement>(null);
    const introCompleteRef = useRef(false);

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
    // const titleRef = useRef(null); // Duplicated at line 407
    // const cardRefs = useRef<Array<HTMLDivElement | null>>([]); // Duplicated at line 410


    const videoSectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoMuted, setIsVideoMuted] = useState(true);



    // Our Work horizontal scroll section refs
    const ourWorkSectionRef = useRef<HTMLDivElement>(null);
    const horizontalScrollRef = useRef<HTMLDivElement>(null);

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

    // Override services section if servicesData is available
    if (servicesData) {
        servicesSection.title = servicesData.headerTitle || servicesSection.title;

        // Define default images for each section
        const serviceImages: { [key: string]: string } = {
            strategy: "/strategy.jpeg",
            branding: "/brand.jpg",
            content: "/content.jpeg",
            digital: "/digital.jpeg",
            agentVUA: "/vua.jpeg",
            techSolutions: "/tech.jpeg",
            agentVision: "/vision.png",
            agentXR: "/xr.jpeg"
        };

        const newCards: ServiceCard[] = [];
        let orderCounter = 1;

        // Helper to add card
        const addCard = (key: string, title: string, description: string, tags: string[], imageKey: string) => {
            if (title) { // Only add if title exists
                newCards.push({
                    id: key,
                    title,
                    description,
                    image: serviceImages[imageKey] || "/serviceVector.png",
                    tags: tags || [],
                    imagePosition: orderCounter % 2 === 0 ? "right" : "left",
                    order: orderCounter++,
                    isActive: true
                });
            }
        };

        addCard('strategy', servicesData.strategyTitle, servicesData.strategyDescription, servicesData.strategyServices, 'strategy');
        addCard('branding', servicesData.brandingTitle, servicesData.brandingDescription, servicesData.brandingServices, 'branding');
        addCard('content', servicesData.contentTitle, servicesData.contentDescription, servicesData.contentServices, 'content');
        addCard('digital', servicesData.digitalTitle, servicesData.digitalDescription, servicesData.digitalServices, 'digital');
        addCard('agentVUA', servicesData.agentVUATitle, servicesData.agentVUADescription, servicesData.agentVUAFeatures, 'agentVUA');
        addCard('techSolutions', servicesData.techSolutionsTitle, servicesData.techSolutionsDescription, [servicesData.techSolutionsTagline].filter(Boolean), 'techSolutions');
        addCard('agentVision', servicesData.agentVisionTitle, servicesData.agentVisionDescription, [], 'agentVision');
        addCard('agentXR', servicesData.agentXRTitle, servicesData.agentXRDescription, servicesData.agentXRServices, 'agentXR');

        servicesSection.cards = newCards;
    }

    const foundationSection = aboutContent?.foundationSection || {
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





    const sortedPortfolioItems = useMemo(() => {
        return [...ourWorkContent.portfolioItems]
            .sort((a, b) => a.order - b.order)
            .filter((_, index) => index < 3);
    }, [ourWorkContent.portfolioItems]);

    const maskRef = useRef<SVGRectElement>(null);
    const titleRef = useRef(null);

    // Dynamic card refs
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // animation text intro fade out 
    useEffect(() => {
        if (!introRef.current) return;

        const ctx = gsap.context(() => {
            const blocks = introRef.current!.querySelectorAll(".intro-block");

            // Initial setup
            gsap.set(blocks, { y: "0%", scaleY: 1, opacity: 1 });
            if (introTextRef.current) {
                gsap.set(introTextRef.current, { opacity: 1, color: "black" }); // Ensure text starts black
            }
            if (introOverlayRef.current) {
                gsap.set(introOverlayRef.current, { opacity: 0 }); // Overlay hidden initially
            }

            // Wait for some time before starting disappearance animation
            const tl = gsap.timeline({
                delay: 4.5, // wait 4.5 seconds before animation starts
                onStart: () => {
                    // Start video when animation starts (so it plays while revealed)
                    if (videoRef.current) {
                        videoRef.current.play().catch((e) => console.log("Intro autoplay prevented:", e));
                    }
                },
                onComplete: () => {
                    setShowIntro(false);
                    introCompleteRef.current = true;
                },
            });

            const blockStartDelay = 0; // Starts immediately after the initial delay

            // 1. Animate blocks away (revealing video + overlay)
            blocks.forEach((block, i) => {
                // Using same stagger/pattern as before for the blocks
                if (i === 0) {
                    tl.to(block, { y: "100%", duration: 1.6, ease: "power4.inOut" }, blockStartDelay + i * 0.12);
                }
                if (i === 1) {
                    tl.to(block, { scaleY: 0, duration: 1.6, ease: "power4.inOut" }, blockStartDelay + i * 0.12);
                }
                if (i === 2) {
                    tl.to(block, { y: "-100%", duration: 1.6, ease: "power4.inOut" }, blockStartDelay + i * 0.12);
                }
                if (i === 3) {
                    tl.to(block, { scaleY: 0, duration: 1.6, ease: "power4.inOut" }, blockStartDelay + i * 0.12);
                }
                if (i === 4) {
                    tl.to(block, { y: "100%", duration: 1.6, ease: "power4.inOut" }, blockStartDelay + i * 0.12);
                }
            });

            // 2. WHILE blocks are clearing:
            //    a) Fade in Black Overlay (so text is readable on video)
            //    b) Change Text Color to White
            if (introOverlayRef.current) {
                // Start fading in slightly after blocks start moving to mask the transition
                tl.to(introOverlayRef.current, { opacity: 0.6, duration: 1.0, ease: "power2.inOut" }, blockStartDelay + 0.5);
            }

            if (introTextRef.current) {
                // Change text to white around the same time overlay appears
                tl.to(introTextRef.current, { color: "white", duration: 1.0, ease: "power2.inOut" }, blockStartDelay + 0.5);
            }

            // 3. HOLD phase - Text stays visible on Video + Overlay
            tl.to({}, { duration: 0.5 }); // Wait for 2 seconds

            // 4. Fade everything out (Intro Container = Grid + Overlay, and Text)
            // We can fade the wrapper and the text together
            tl.to(
                [introRef.current, introTextRef.current], // Fade out grid/overlay wrapper AND text
                { opacity: 0, duration: 1.0, ease: "power2.inOut" }
            );
        }, introRef);

        return () => ctx.revert();
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
        const raf = (time: any) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(raf);
            if (lenis) {
                lenis.destroy();
            }
        };
    }, []);

    // Hero Section Animation
    useEffect(() => {
        const isMobile = window.innerWidth < 1024;

        const heroCtx = gsap.context(() => {
            const heroTl = gsap.timeline({
                // The animation will start 10 seconds AFTER the ScrollTrigger action fires (enters view)
                delay: 10,
                repeat: -1, // Loop infinitely
                paused: true, // Start paused, let ScrollTrigger control playback
                scrollTrigger: {
                    trigger: "#heroPin",
                    // Trigger when the top of the section is 80% down the viewport (visible)
                    start: "top 80%",
                    toggleActions: "play none none none", // Play once when entered
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

            // Dynamic animation loop - animate through ALL items to create a full cycle
            const maxAnimations = textRefs.length;

            for (let i = 0; i < maxAnimations; i++) {
                const currentTextRef = textRefs[i];
                // Wrap around to 0 for the last item
                const nextTextRef = textRefs[(i + 1) % textRefs.length];

                // Cycle through available images
                const currentImageRef = imageRefs[i % imageRefs.length];
                const nextImageRef = imageRefs[(i + 1) % imageRefs.length];

                if (currentTextRef?.current && nextTextRef?.current) {
                    // Hold phase - keep current text visible for a bit
                    heroTl.to({}, { duration: 2.0 });

                    // Animate current OUT
                    heroTl.to(currentTextRef.current, {
                        y: "-100%",
                        opacity: 0,
                        duration: 1.0,
                        ease: "power2.inOut",
                    });

                    // Animate current image OUT if it exists
                    if (currentImageRef?.current) {
                        heroTl.to(
                            currentImageRef.current,
                            {
                                opacity: 0,
                                duration: 1.0,
                                ease: "power2.inOut",
                            },
                            "<"
                        );
                    }

                    // Animate next IN
                    // For the loop to be smooth, we must ensure the 'next' item (which might be index 0)
                    // is reset to start position if it was moved previously. 
                    // However, in a timeline loop, simpler is to just animate it in.
                    // But wait: if we animate 0->1, 1->2, 2->3, 3->0.
                    // At 3->0, 0 comes from "100%" (bottom).
                    // In the initial state, 0 is at 0%.
                    // If we just animate 3->0, 0 will come from bottom.
                    // When the timeline repeats, 0 is ALREADY at 0%.
                    // So step 1 (Hold 0) is fine.
                    // Step 1 end (0 -> -100%).
                    // So we need to make sure 0 is reset to bottom before 3->0 starts?
                    // Actually, for a seamless `repeat: -1`, the end state of the timeline 
                    // must perfectly match the start state OR the start of the timeline must reset properties.
                    // Start state: 0 is at 0%, others at 100%.
                    // End of 3->0: 0 is at 0%, 3 is at -100%.
                    // Timeline restarts: 0 is held at 0%. Then 0 animates to -100%.
                    // But wait, what about 3? 3 is at -100% (top) at end of timeline.
                    // If we restart, 3 (nextTextRef for i=2) needs to be at 100% (bottom) before it comes in.
                    // Currently, 3 goes 3->0 (OUT). 3 ends at -100%.
                    // When does 3 go back to 100%?
                    // WE need to reset the "outgoing" item to the bottom AFTER it goes out?
                    // Or use `.set` within the timeline.

                    heroTl.to(
                        nextTextRef.current,
                        {
                            y: "0%",
                            opacity: 1,
                            duration: 1.0,
                            ease: "power2.inOut",
                        },
                        "<0.1"
                    );

                    // Animate next image IN
                    if (nextImageRef?.current) {
                        heroTl.to(
                            nextImageRef.current,
                            {
                                opacity: 1,
                                duration: 1.0,
                                ease: "power2.inOut",
                            },
                            "<"
                        );
                    }

                    // RESET logic: After an item has animated out (currentTextRef), move it back to start position (100%)
                    // so it's ready to come in again later.
                    // We can do this immediately after it finishes animating out.
                    heroTl.set(currentTextRef.current, { y: "100%" });
                    // Also reset opacity if needed, though we animate opacity to 1 on IN.
                    // Keeping opacity 0 is fine.
                }
            }

            // Final hold phase
            heroTl.to({}, { duration: 1 });
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
                y: () => (window.innerWidth < 1024 ? -80 : -150),
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
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => { }, sectionRef); // Context for cleanup

        mm.add({
            isMobile: "(max-width: 1023px)",
            isDesktop: "(min-width: 1024px)"
        }, (context) => {
            const { isMobile } = context.conditions as any;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "500%",
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true, // Important for resize
                },
            });

            // IMPORTANT: force recalculation so hero pin (which comes after services) will work
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
                        {
                            top: isMobile ? "10%" : "20%",
                            duration: 1
                        },
                        index === 0 ? "-=.9" : "-=.9"
                    );
                    if (index < cardRefs.current.length - 1) {
                        tl.to(cardRef, { scale: 0.5, opacity: 0, duration: 1 });
                    }
                }
            });
        }, sectionRef);

        return () => {
            mm.revert();
            ctx.revert();
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
                    if (videoRef.current && introCompleteRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play().catch((e) => console.log("Autoplay prevented:", e));
                    }
                },
                onEnterBack: () => {
                    if (videoRef.current && introCompleteRef.current) {
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



    // Our Work Horizontal Scroll Animation
    useEffect(() => {
        const ourWorkCtx = gsap.context(() => {
            if (!horizontalScrollRef.current || !ourWorkSectionRef.current) return;

            // Use matchMedia for responsive animation
            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
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
                className="relative w-full h-auto lg:h-screen flex items-center justify-center overflow-hidden p-0 m-0"
                style={{ backgroundColor: videoSection.backgroundColor }}
            >
                <div className="relative w-full h-full">
                    {showIntro && (
                        <>
                            {/* Intro Background Grid & Overlay Wrapper */}
                            <div
                                ref={introRef}
                                className="intro-grid absolute inset-0 z-20 grid grid-cols-5"
                            >
                                {/* Black Overlay - Initially hidden, appears when grid clears */}
                                <div
                                    ref={introOverlayRef}
                                    className="absolute inset-0 bg-black z-[-1] pointer-events-none"
                                    style={{ opacity: 0 }}
                                />

                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="intro-block bg-white w-full h-full"></div>
                                ))}
                            </div>

                            {/* Text - OUTSIDE the grid so it's independent, but Z-indexed above */}
                            <h1
                                ref={introTextRef}
                                className="absolute inset-0 z-30 flex items-center justify-center text-xl lg:text-5xl font-medium text-black pointer-events-none text-center px-4 leading-normal"
                            >
                                Blending human-led creativity <br className="hidden lg:block" /> with AI-powered efficiency.
                            </h1>
                        </>
                    )}


                    <video
                        ref={videoRef}
                        className="block w-full h-auto lg:absolute lg:inset-0 lg:w-full lg:h-full lg:object-cover lg:scale-[0.9]"
                        playsInline
                        loop
                        muted
                        preload="auto"
                        src={getVideoUrl(videoSection.videoSrc)}
                    />

                    {/* Sound Toggle Button */}
                    <button
                        onClick={toggleVideoMute}
                        className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 z-10 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-3 lg:p-4 transition-all duration-300 backdrop-blur-sm opacity-70 hover:opacity-90"
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
                                className="w-5 h-5 lg:w-6 lg:h-6 text-white"
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
                                className="w-5 h-5 lg:w-6 lg:h-6 text-white"
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

            {/* About & Foundation Scroll Section */}
            <AboutFoundation aboutContent={aboutContent} foundationSection={foundationSection} />


            {/* Our Work Header */}
            <div className="w-full py-10 lg:py-16 bg-[#EEF0FF] flex flex-col items-center justify-center text-center px-4">
                <div className="relative mb-8">
                    <h2 className="text-[48px] lg:text-[60px] font-light text-[#6210FF] tracking-tight"
                        style={{ fontFamily: "PetrovSans", fontWeight: 300 }}>
                        {ourWorkContent.headerSection.title}
                    </h2>
                </div>
                <p className="text-gray-600 max-w-5xl text-[18px] lg:text-[22px] leading-relaxed font-light">
                    {ourWorkContent.headerSection.description}
                </p>
            </div>


            {/* Our Work - Responsive Section */}
            <section
                ref={ourWorkSectionRef}
                className="relative w-full min-h-screen bg-[#EEF0FF] lg:bg-black overflow-hidden"
            >
                {/* Horizontal Scroll Container (Desktop) */}
                <div
                    ref={horizontalScrollRef}
                    className="hidden lg:flex h-screen"
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
                                sizes="100vw"
                                priority={index === 0}
                            />

                            {/* Overlay for text readability */}
                            <div className="absolute inset-0 bg-black/20" />

                            {/* View More Circle - Centered */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer">
                                <Link href={item._id ? `/work-detail/${item._id}` : '#'}>
                                    <div className="w-24 h-10 lg:w-42 lg:h-10 rounded-full border border-white/30  flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10">
                                        <span className="text-white text-sm lg:text-base font-medium">Explore More</span>
                                        <svg
                                            width="40"
                                            height="40"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="transform rotate-0"
                                        >
                                            <path
                                                d="M7 10C7 10 9.5 14 12 14C14.5 14 17 10 17 10"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </Link>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 lg:p-16 flex flex-col justify-end">
                                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                                    {/* Title (Bottom Left) */}
                                    <h2 className="text-white text-2xl lg:text-4xl xl:text-6xl font-bold tracking-tight"
                                        style={{ fontFamily: "PetrovSans", fontWeight: 400 }}>
                                        {item.name}
                                    </h2>

                                    {/* Tags (Bottom Right) */}
                                    <div className="flex gap-4">
                                        <span className="px-6 py-2 rounded-full border border-white/30 backdrop-blur-md text-white text-sm lg:text-lg">
                                            {item.year}
                                        </span>
                                        <span className="px-6 py-2 rounded-full border border-white/30 backdrop-blur-md text-white text-sm lg:text-lg uppercase tracking-wider">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Vertical Stack Container (Mobile) */}
                <div className="flex lg:hidden flex-col w-full h-auto px-4 py-8 gap-8 bg-[#EEF0FF]">
                    {sortedPortfolioItems.map((item: PortfolioItem, index: number) => (
                        <Link
                            href={item._id ? `/work-detail/${item._id}` : '#'}
                            key={`mobile-${index}`}
                            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg block"
                        >
                            <Image
                                src={getImageUrl(item.image)}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority={index === 0}
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
                                        <div className="flex items-center gap-1 text-white text-xs opacity-90 border border-white/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                            Explore More
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10C7 10 9.5 14 12 14C14.5 14 17 10 17 10" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Unique "See All Work" Button for Mobile */}
                    <div className="relative z-50 flex justify-center mt-4 pb-8">
                        <Link href="/work" className="flex items-center gap-2 px-6 py-3 bg-white text-[#6210FF] rounded-full shadow-md border border-[#6210FF]/20 cursor-pointer">
                            <span className="text-sm font-bold uppercase tracking-wide">SEE ALL WORK</span>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="transform rotate-0"
                            >
                                <path
                                    d="M7 10C7 10 9.5 14 12 14C14.5 14 17 10 17 10"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* See All Work Footer */}
            <div className="w-full py-20 bg-[#F5F5F7] hidden lg:flex justify-center items-center">
                <Link href="/work" className="group flex items-center gap-3 px-8 py-4 bg-transparent text-[#6210FF] border-2 border-[#6210FF] rounded-full hover:bg-[#6210FF] hover:text-white transition-all duration-300">
                    <span className="text-lg font-medium tracking-wide uppercase">{ourWorkContent.footerSection.buttonText}</span>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transform group-hover:scale-110 transition-transform duration-300"
                    >
                        <path
                            d="M7 10C7 10 9.5 14 12 14C14.5 14 17 10 17 10"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>

            {/* service section */}
            <section
                ref={sectionRef}
                className="flex min-h-screen overflow-hidden flex-col items-center justify-start"
                style={{ background: "linear-gradient(227.56deg, #BE2FF4 -3.49%, #6210FF 87.5%)" }}
            >
                <div className="relative" ref={titleRef}>
                    {/* Background Image */}
                    {/* <div className="absolute -top-44 -left-56 -right-56 flex items-center justify-center">
                        <Image
                            src={getImageUrl(servicesSection.backgroundImage)}
                            className="max-w-full h-auto"
                            alt="Decorative background"
                            width={1300}
                            height={600}
                        />
                    </div> */}

                    {/* Text Content */}
                    <h1 className="text-[48px] lg:text-[80px] pt-[100px] lg:pt-[80px] text-center font-[300] text-white animate__animated animate__fadeInUp relative z-10 px-4"
                        style={{ fontFamily: "PetrovSans", fontWeight: 300 }}>
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
                        className={`absolute ${index === 0 ? "top-[40%]" : "top-[100%]"} z-${index * 10} mb-5 bg-white rounded-[10px] lg:rounded-[30px] shadow-lg max-w-[90%] lg:max-w-[800px] xl:max-w-[1100px] 2xl:max-w-[70%] flex flex-col lg:flex-row overflow-hidden mx-4 lg:mx-0 h-auto lg:h-[500px]`}
                        style={{ boxShadow: "0 20px 50px -10px rgba(190, 47, 244, 0.3)" }}
                    >
                        <div
                            className={`w-full lg:w-1/2 p-4 lg:p-10 flex justify-center items-center ${card.imagePosition === "right" ? "order-1" : ""}`}
                        >
                            <Image
                                width={800}
                                height={600}
                                src={getImageUrl(card.image)}
                                alt={card.title}
                                className="w-full h-full object-cover rounded-[10px] lg:rounded-[30px]"
                                unoptimized={true}
                            />
                        </div>

                        <div
                            className={`w-full lg:w-1/2 p-4 pt-0 ${card.imagePosition === "right" ? "lg:pr-0 order-2 lg:order-first" : "lg:pl-0"} lg:p-8 flex flex-col h-full`}
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            <div className="flex-grow">
                                <h2 className="text-3xl lg:text-[50px] font-outfit leading-tight text-gray-900 mb-4">
                                    {card.title}
                                </h2>
                                <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl leading-tight text-gray-900 mb-6 lg:mb-8">
                                    {card.description}
                                </p>
                                <div className="flex flex-wrap gap-2 xl:gap-3 mb-2 xl:mb-6">
                                    {card.tags.map((tag: any, tagIndex: any) => (
                                        <span
                                            key={tagIndex}
                                            className="px-2 py-0 leading-normal xl:leading-relaxed lg:px-4 lg:py-2 border border-[#6210FF] text-gray-900 rounded-full text-xs xl:text-lg"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto pt-4 lg:pt-6 w-full flex lg:justify-end justify-start opacity-0">
                                <button className="flex items-center gap-2 px-4 py-2 xl:px-6 xl:py-3 bg-white text-gray-900 border-2 border-[#6210FF] rounded-full hover:bg-gray-50 transition-all duration-200">
                                    <span className="text-xs lg:text-sm xl:text-lg font-medium">EXPLORE MORE</span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 xl:w-9 xl:h-9">
                                        <path d="M7 10C7 10 9.5 14 12 14C14.5 14 17 10 17 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Our Client Section */}


            {/* Our Client Section */}
            <OurClient />

            {/* Instagram Feed Section */}
            <InstagramFeed />
            {/* Hero pinned wrapper */}
            <section id="heroPin">
                {/* HeroSection */}
                <section ref={heroRef} className="hero-section w-full h-screen relative overflow-hidden bg-black">
                    <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop playsInline>
                        <source src={getVideoUrl(heroSection.backgroundVideo)} type="video/mp4" />
                    </video>

                    <div className="mx-auto h-full flex flex-col lg:flex-row items-center justify-center px-0 relative z-10">
                        <div className="w-full lg:w-6/12 h-auto flex flex-col sm:mt-20 items-center lg:items-start justify-center py-8 lg:pl-32 lg:py-0 pl-8">
                            <h2 className="w-full text-[44px] xs:text-6xl sm:text-7xl lg:text-[50px] xl:text-[80px] 2xl:text-[114px] text-white leading-[1.1] font-medium">
                                {heroSection.mainTitle}
                            </h2>

                            <div className="martech-wrapper w-full relative overflow-hidden h-[72px] xs:h-[84px] sm:h-[102px] lg:h-[180px]">
                                {heroSection.rotatingTexts.map((text: any, idx: any) => (
                                    <span
                                        key={idx}
                                        ref={textRefs[idx]}
                                        className="absolute top-0 left-0 w-full font-extrabold bg-gradient-to-r from-[#BE2FF4] to-[#6210FF] text-transparent bg-clip-text text-[50px] xs:text-6xl sm:text-7xl lg:text-8xl lg:text-[60px] xl:text-[90px] 2xl:text-[110px] leading-[1.2] inline-block"
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

                        <div className="w-full lg:w-6/12 pl-4 sm:pl-0.5 lg:pl-0 h-auto lg:h-full flex items-center justify-center relative">
                            <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] lg:h-full flex justify-center items-center lg:items-end relative">
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
