"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { RingScene } from "../About/Scene";
import * as THREE from "three";
import Lenis from "@studio-freight/lenis";
import HeroSection from "./landingPage/HeroSection";
import ParallaxSection from "./landingPage/ParallaxSection";

// Helper function to resolve image URLs
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

// Helper function to resolve video URLs
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


  // About section refs
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const muteButtonRef = useRef<HTMLButtonElement>(null);


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


  const videoSection = aboutContent?.videoSection || {
    videoSrc: "/vua-intro-2.mp4",
    backgroundColor: "#EEF0FF",
  };

  // Get sorted cards and foundations
  const sortedCards = servicesSection.cards
    .filter((card: any) => card.isActive)
    .sort((a: any, b: any) => a.order - b.order);

  const sortedFoundations = foundationSection.foundations.sort(
    (a: any, b: any) => a.order - b.order
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
    if (!videoSection?.videoSrc || !videoRef.current || !videoSectionRef.current) return;

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
  }, [videoSection?.videoSrc]);

  const toggleVideoMute = useCallback(() => {
    if (videoRef.current && muteButtonRef.current) {
      const video = videoRef.current;
      const button = muteButtonRef.current;
      const newMutedState = !video.muted;
      
      video.muted = newMutedState;
      
      // Update button content directly without React state
      button.innerHTML = newMutedState ? `
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 md:w-6 md:h-6 text-white"
        >
          <path
            d="M16.5 12C16.5 10.23 15.5 8.71 14 7.97V9.18L16.45 11.63C16.48 11.86 16.5 12.08 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z"
            fill="currentColor"
          />
        </svg>
      ` : `
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 md:w-6 md:h-6 text-white"
        >
          <path
            d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.02C15.5 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12S16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12S18.01 4.14 14 3.23Z"
            fill="currentColor"
          />
        </svg>
      `;
      
      // Update aria-label
      button.setAttribute('aria-label', newMutedState ? 'Unmute video' : 'Mute video');
    }
  }, []);

  return (
    <section>
      {/* HeroSection */}


      <HeroSection />

      {/* Parallax Section */}
      <ParallaxSection />

      {/* dynamic service card  */}
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
              {foundationSection.title.split(" ").map((word: any, index: any) => (
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
          {sortedFoundations.map((foundation: any, index: any) => (
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
      {(videoSection?.videoSrc || videoSection.videoSrc) && (
        <section
          ref={videoSectionRef}
          className="relative w-full h-auto md:h-screen flex items-center justify-center overflow-hidden p-0 m-0"
          style={{ backgroundColor: videoSection.backgroundColor }}
        >
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              key={`video-${getVideoUrl(videoSection.videoSrc)}`}
              className="w-full h-auto md:absolute md:inset-0 md:w-full md:h-full md:object-cover md:scale-[0.9]"
              playsInline
              loop
              muted
              autoPlay
              preload="metadata"
              src={getVideoUrl(videoSection.videoSrc)}
            />

            {/* Sound Toggle Button */}
            <button
              ref={muteButtonRef}
              onClick={toggleVideoMute}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-10 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-3 md:p-4 transition-all duration-300 backdrop-blur-sm opacity-70 hover:opacity-90"
              aria-label="Unmute video"
            >
              {/* Initial muted icon */}
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
            </button>
          </div>
        </section>
      )}
    </section>
  );
}
