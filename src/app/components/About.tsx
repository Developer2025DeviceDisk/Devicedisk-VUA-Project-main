"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { RingScene } from "../About/Scene";
import * as THREE from "three";
import Lenis from "@studio-freight/lenis";

// Helper function to resolve image URLs
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // If it's an uploaded image (starts with /uploads), serve from backend
  if (imagePath.startsWith('/uploads/')) {
    return `http://15.206.84.81:8000${imagePath}`;
  }
  
  // For default images in public folder, serve from frontend
  return imagePath;
};

// Helper function to resolve video URLs
const getVideoUrl = (videoPath: string): string => {
  if (!videoPath) return '';
  
  // If it's already a full URL, return as is
  if (videoPath.startsWith('http')) return videoPath;
  
  // If it's an uploaded video (starts with /uploads), serve from backend
  if (videoPath.startsWith('/uploads/')) {
    return `http://15.206.84.81:8000${videoPath}`;
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

export default function About({ aboutContent }: any) {
  // HeroSection refs
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

  // About section refs
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const parallaxContainerRef = useRef(null);

  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

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

    console.log('foundationSection :', foundationSection)

  const videoSection = aboutContent?.videoSection || {
    videoSrc: "/vua-intro.mp4",
    backgroundColor: "#EEF0FF",
  };

  // Get sorted cards and foundations
  const sortedCards = servicesSection.cards
    .filter((card:any) => card.isActive)
    .sort((a:any, b:any) => a.order - b.order);

  const sortedFoundations = foundationSection.foundations.sort(
    (a:any, b:any) => a.order - b.order
  );

  const maskRef = useRef<SVGRectElement>(null);
  const titleRef = useRef(null);

  // Dynamic card refs
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize card refs based on sorted cards
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, sortedCards.length);
    for (let i = cardRefs.current.length; i < sortedCards.length; i++) {
      cardRefs.current[i] = null;
    }
  }, [sortedCards.length]);
  const scrollYProgress = useRef(0);

  // -------------- Foundation section refs --------------
  const foundationSectionRef = useRef<HTMLElement>(null);
  const foundationTitleRef = useRef<THREE.Object3D>(null);
  const foundationTitleTopRef = useRef<THREE.Mesh>(null);
  const foundationTitleBottomRef = useRef<THREE.Mesh>(null);

  const foundationMobileTitle = useRef<HTMLDivElement>(null);
  const foundationContent1Ref = useRef<HTMLDivElement>(null);
  const foundationContent2Ref = useRef<HTMLDivElement>(null);
  const foundationContent3Ref = useRef<HTMLDivElement>(null);
  const foundationContent4Ref = useRef<HTMLDivElement>(null);

  const modalGroupRef = useRef<THREE.Group>(null);
  const modalGroupRe2 = useRef<THREE.Group>(null);
  const torus = useRef<THREE.Mesh>(null);
  const torus001 = useRef<THREE.Mesh>(null);
  const torus002 = useRef<THREE.Mesh>(null);
  const torus003 = useRef<THREE.Mesh>(null);

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
      textRefs.forEach((ref:any, index:any) => {
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

      // Title out
      tl.to(titleRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
      });

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

  // Foundation Section Animation
  useEffect(() => {
    const foundationCtx = gsap.context(() => {
      gsap.set(
        [
          foundationContent1Ref.current,
          foundationContent2Ref.current,
          foundationContent3Ref.current,
          foundationContent4Ref.current,
        ],
        {
          yPercent: 50,
          opacity: 0,
        }
      );

      if (foundationMobileTitle.current) {
        gsap.set(foundationMobileTitle.current, {
          xPercent: -50,
          opacity: 0,
        });
      }

      // First ScrollTrigger: Handle the pinning and positioning
      ScrollTrigger.create({
        trigger: foundationSectionRef.current,
        start: "top 50%",
        end: "top top",
        scrub: true,
        onUpdate: ({ progress }) => {
          const animatedFramesParts = 1;

          if (
            torus001.current &&
            modalGroupRef.current &&
            torus002.current &&
            modalGroupRe2.current
          ) {
            // Animated per frames
            if (foundationTitleRef.current) {
              const foundationTitlePorgess = mapProgress(
                progress,
                animatedFramesParts,
                6,
                5.0 // desktop
              );
              const foundationTitleOpacityPorgess = mapProgress(
                progress,
                animatedFramesParts,
                0,
                1
              );

              gsap.to(foundationTitleRef.current.position, {
                z: foundationTitlePorgess,
                duration: 0,
              });

              gsap.to(foundationTitleTopRef.current, {
                opacity: foundationTitleOpacityPorgess,
                duration: 0,
              });
              gsap.to(foundationTitleBottomRef.current, {
                opacity: foundationTitleOpacityPorgess,
                duration: 0,
              });
            }

            if (foundationMobileTitle.current) {
              const foundationTitleOpacityPorgess = mapProgress(
                progress,
                animatedFramesParts,
                0,
                1
              );

              gsap.to(foundationMobileTitle.current, {
                xPercent: -50 + foundationTitleOpacityPorgess * 50,
                opacity: foundationTitleOpacityPorgess,
              });
            }
          }
        },
      });

      ScrollTrigger.create({
        trigger: foundationSectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 4}px`,
        pin: true,
        pinSpacing: true,
        scrub: false,
        onUpdate: ({ progress }) => {
          const animatedFramesParts = 1 / 5;

          if (
            torus001.current &&
            modalGroupRef.current &&
            torus002.current &&
            torus003.current &&
            torus.current &&
            modalGroupRe2.current
          ) {
            const groupRotationProgress = mapProgress(progress, 1, -180, 180);

            gsap.to(modalGroupRef.current.rotation, {
              y: THREE.MathUtils.degToRad(groupRotationProgress),
              duration: 0,
            });

            // Foundation Content 1
            const foundationContent1Y = mapProgress(
              progress - animatedFramesParts * 0,
              animatedFramesParts / 4,
              50,
              0
            );
            const foundationContent1Opacity = mapProgress(
              progress - animatedFramesParts * 0,
              animatedFramesParts / 4,
              0,
              1
            );
            gsap.to(foundationContent1Ref.current, {
              yPercent: foundationContent1Y,
              opacity: foundationContent1Opacity,
              duration: 0,
            });

            const torus1Progress = mapProgress(
              progress - animatedFramesParts * 0,
              animatedFramesParts / 4,
              -25,
              0
            );
            gsap.to(torus001.current.position, {
              y: torus1Progress,
              duration: 0,
            });

            // Foundation Content 2
            const foundationContent2Y = mapProgress(
              progress - animatedFramesParts * 1,
              animatedFramesParts / 4,
              50,
              0
            );
            const foundationContent2Opacity = mapProgress(
              progress - animatedFramesParts * 1,
              animatedFramesParts / 4,
              0,
              1
            );

            gsap.to(foundationContent2Ref.current, {
              yPercent: foundationContent2Y,
              opacity: foundationContent2Opacity,
              duration: 0,
            });

            const torus2Progress = mapProgress(
              progress - animatedFramesParts * 1,
              animatedFramesParts / 4,
              -30,
              0
            );
            gsap.to(torus002.current.position, {
              z: torus2Progress,
              duration: 0,
            });

            // Foundation Content 3
            const foundationContent3Y = mapProgress(
              progress - animatedFramesParts * 2,
              animatedFramesParts / 4,
              50,
              0
            );
            const foundationContent3Opacity = mapProgress(
              progress - animatedFramesParts * 2,
              animatedFramesParts / 4,
              0,
              1
            );
            gsap.to(foundationContent3Ref.current, {
              yPercent: foundationContent3Y,
              opacity: foundationContent3Opacity,
              duration: 0,
            });
            const torus3Progress = mapProgress(
              progress - animatedFramesParts * 2,
              animatedFramesParts / 4,
              30,
              0
            );
            gsap.to(torus003.current.position, {
              y: torus3Progress,
              duration: 0,
            });

            // Foundation Content 4
            const foundationContent4Y = mapProgress(
              progress - animatedFramesParts * 3,
              animatedFramesParts / 4,
              50,
              0
            );
            const foundationContent4Opacity = mapProgress(
              progress - animatedFramesParts * 3,
              animatedFramesParts / 4,
              0,
              1
            );
            gsap.to(foundationContent4Ref.current, {
              yPercent: foundationContent4Y,
              opacity: foundationContent4Opacity,
              duration: 0,
            });
            const torus4Progress = mapProgress(
              progress - animatedFramesParts * 3,
              animatedFramesParts / 4,
              -30,
              0
            );

            gsap.to(torus.current.position, {
              y: torus4Progress,
              duration: 0,
            });

            // Final Frame - All Torus Animation
            const torusAllProgress = mapProgress(
              progress - animatedFramesParts * 4,
              animatedFramesParts / 4,
              0,
              1
            );
            gsap.to(torus001.current.position, {
              x: -1 + torusAllProgress,
              z: 1 - torusAllProgress,
              duration: 0,
            });

            gsap.to(torus002.current.position, {
              x: -1 + torusAllProgress,
              duration: 0,
            });

            gsap.to(torus003.current.position, {
              x: 1 - torusAllProgress,
              z: -1 + torusAllProgress,
              duration: 0,
            });

            gsap.to(torus.current.position, {
              x: 1 - torusAllProgress,
              z: 1 - torusAllProgress,
              duration: 0,
            });

            if (progress < 0.8) {
              modalGroupRef.current.visible = true;
              modalGroupRe2.current.visible = false;
            }
            if (progress > 0.8) {
              modalGroupRef.current.visible = false;
              modalGroupRe2.current.visible = true;
            }
          }
        },
      });
    }, foundationSectionRef);

    return () => {
      foundationCtx.revert();
    };
  }, []);

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
            videoRef.current
              .play()
              .catch((e) => console.log("Autoplay prevented:", e));
          }
        },
        onEnterBack: () => {
          if (videoRef.current) {
            videoRef.current
              .play()
              .catch((e) => console.log("Autoplay prevented:", e));
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

  return (
    <section>
      {/* HeroSection */}
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
              {heroSection.rotatingTexts.map((text:any, idx:any) => (
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
            {parallaxSection.title.split("\n").map((line:any, index:any) => (
              <span key={index}>
                {line}
                {index < parallaxSection.title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>
      </section>

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
        {sortedCards.map((card:any, index:any) => (
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
                  {card.tags.map((tag:any, tagIndex:any) => (
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
                  <span className="text-xs md:text-sm xl:text-lg font-medium">
                    EXPLORE MORE
                  </span>
                  <Image
                    src="/curve.png"
                    alt="Arrow icon"
                    className="w-4 h-4 xl:w-8 xl:h-8 object-contain"
                    width={30}
                    height={40}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section
        ref={foundationSectionRef}
        className="relative w-screen h-screen text-zinc-900 overflow-hidden"
        style={{ backgroundColor: foundationSection.backgroundColor }}
      >
        <section
          style={{
            position: "absolute",
            left: "0%",
            width: "100%",
            height: "100vh",
            bottom: "0%",
            zIndex: 1,
          }}
        >
          <RingScene
            modalGroupRef={modalGroupRef}
            modalGroupRe2={modalGroupRe2}
            foundationSection={foundationSection} 
            torus={torus}
            torus001={torus001}
            torus002={torus002}
            torus003={torus003}
            foundationTitleRef={foundationTitleRef}
            foundationTitleTopRef={foundationTitleTopRef}
            foundationTitleBottomRef={foundationTitleBottomRef}
          />
        </section>

        <div
          className="absolute right-0 top-[120px] w-full h-screen z-[2]  pl-8 gap-7
             lg:w-1/2  lg:gap-8 lg:top-0 lg:hidden
            "
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div ref={foundationMobileTitle}>
              {foundationSection.title.split(" ").map((word:any, index:any) => (
                <h2
                  key={index}
                  className="text-[50px] text-white font-[400] m-0 leading-[45px] max-[350px]:text-[40px] lg:text-6xl"
                >
                  {word}
                </h2>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute right-0 bottom-[40px] w-full h-screen z-[2] flex flex-col items-start justify-end pl-8 gap-7
            max-[350px]:gap-[14px]
             lg:w-1/2  lg:gap-[5.5%] lg:bottom-0 lg:justify-center
            "
        >
          {sortedFoundations.map((foundation:any, index:any) => (
            <div
              key={index}
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                ref={(el) => {
                  if (index === 0) foundationContent1Ref.current = el;
                  else if (index === 1) foundationContent2Ref.current = el;
                  else if (index === 2) foundationContent3Ref.current = el;
                  else if (index === 3) foundationContent4Ref.current = el;
                }}
              >
                <h2 className="text-[35px] text-white font-medium m-0 max-[350px]:text-[27px] lg:text-[3rem]">
                  {foundation.title}
                </h2>
                <p className="text-base text-white font-medium m-0">
                  {foundation.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section
        ref={videoSectionRef}
        className="relative w-full h-auto md:h-screen flex items-center justify-center overflow-hidden p-0 m-0"
        style={{ backgroundColor: videoSection.backgroundColor }}
      >
        <div className="relative w-full h-full">
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
    </section>
  );
}
