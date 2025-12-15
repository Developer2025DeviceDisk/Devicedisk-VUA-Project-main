"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Observer from "gsap/dist/Observer";
import SplitText from "gsap/SplitText";
import Lenis from "@studio-freight/lenis";
import { useParallax } from "@/hooks/useParrallax";
import { RingScene } from "./Scene";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, SplitText, Observer);

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

// TypeScript interfaces for About Page content
interface TeamMember {
  name: string;
  role: string;
  image: string;
  order: number;
  isActive: boolean;
}

interface Foundation {
  title: string;
  description: string;
  order: number;
}

interface Director {
  name: string;
  role: string;
  image: string;
  description: string;
  order: number;
  isActive: boolean;
}

export interface AboutPageContent {
  headerSection?: {
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    backgroundGradient: string;
    heroImage: string;
    decorativeImage: string;
  };
  aboutUsSection?: {
    mainTextLine1: string;
    mainTextLine2: string;
    textColor: string;
    backgroundColor: string;
  };
  whoAreWeSection?: {
    title: string;
    backgroundImage: string;
    leftImages: {
      decorativeArc: string;
      astronaut: string;
    };
    content: {
      paragraph1: string;
      highlightText: string;
      paragraph1Continuation: string;
      paragraph2: string;
    };
  };
  foundationSection?: {
    title: string;
    backgroundColor: string;
    foundations: Foundation[];
  };
  directorSection?: {
    sectionTitle: string;
    backgroundColor: string;
    directors: Director[];
  };
  teamSection?: {
    sectionTitle: string;
    backgroundColor: string;
    titleGradient: string;
    teamMembers: TeamMember[];
  };
}

// Default fallback content
export const defaultContent: AboutPageContent = {
  headerSection: {
    titleLine1: "Your Voice In",
    titleLine2: "The Future Of",
    titleLine3: "Marketing.",
    backgroundGradient: "from-[#6210FF] to-[#BE2FF4]",
    heroImage: "/Marketingwoman.png",
    decorativeImage: "/Markofinnovation.png",
  },
  aboutUsSection: {
    mainTextLine1: "'Vua' is the Voice that will lead the dialogue",
    mainTextLine2: "for a future-forward world of Marketing.",
    textColor: "#6210FF",
    backgroundColor: "#EEF0FF",
  },
  whoAreWeSection: {
    title: "Who Are We?",
    backgroundImage: "/Whoarewe.png",
    leftImages: {
      decorativeArc: "/Layer_1.png",
      astronaut: "/astro.png",
    },
    content: {
      paragraph1:
        "We are a future-focused Marketing agency that aims to help brands leverage the latest in marketing creativity and technology to achieve their Growth KPIs.",
      highlightText:
        "Our 360-degree service portfolio of creative, digital and Mar-Tech solutions",
      paragraph1Continuation:
        "empowers brands to lead, not follow, in a world shaped by innovation.",
      paragraph2:
        "VUA is more than a brand-it's a movement for those who seek to lead the next era of change.",
    },
  },
  foundationSection: {
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
  },
  directorSection: {
    sectionTitle: "Director",
    backgroundColor: "#EEF0FF",
    directors: [
      {
        name: "Vishal Sharma",
        role: "",
        image: "/Vishal-Sharma.png",
        description:
          "A seasoned leader with over 25 Years of diverse industry experience spanning Media, Telecom, Real Estate, Infrastructure, and Utilities, Vishal is recognized for his ability to develop and implement winning, comprehensive Marketing Communication and Branding Strategies in complex environments. His expertise as a brand marketing leader encompasses cross-functional knowledge of both Domestic and Global Markets.\n\nPrior to his entrepreneurial ventures, Vishal held Senior Managerial Positions leading Branding & Communications at prestigious organizations including Bharti Airtel, Vodafone, Reliance, Etisalat, Essel Group, Anarock, GreenCell Mobility, and PropertyPistol.",
        order: 1,
        isActive: true,
      },
      {
        name: "Shivendra Singh",
        role: "",
        image: "/Shivendra-Singh.png",
        description:
          "A seasoned business leader with over 17 Years of experience in the Real Estate Industry across India and international markets, including the GCC, Europe, and North America. He has held key positions in prestigious organizations such as AllCheckDeals (InfoEdge), Proptiger.com, JLL, ANAROCK, and PropertyPistol. He has been instrumental in successfully managing both Indian and international portfolios, showcasing a proven ability to navigate diverse market dynamics.",
        order: 2,
        isActive: true,
      },
    ],
  },
  teamSection: {
    sectionTitle: "Our Team",
    backgroundColor: "black",
    titleGradient: "from-[#6210FF] to-[#BE2FF4]",
    teamMembers: [
      {
        name: "Gourav Bhatt",
        role: "Digital Marketing",
        image: "/Group 30.png",
        order: 1,
        isActive: true,
      },
      {
        name: "Dishank Shah",
        role: "Chief Business Officer",
        image: "/Group 32.png",
        order: 2,
        isActive: true,
      },
      {
        name: "Heramb Gharat",
        role: "Creative Head",
        image: "/Group 33.png",
        order: 3,
        isActive: true,
      },
      {
        name: "Dishank Shah",
        role: "Chief Business Officer",
        image: "/Group 32.png",
        order: 4,
        isActive: true,
      },
    ],
  },
};
const getTeamSlice = (teamMembers: TeamMember[]) => {
  // Filter active team members and sort by order
  const activeMembers = teamMembers
    .filter((member) => member.isActive)
    .sort((a, b) => a.order - b.order);

  if (activeMembers.length >= 4) return activeMembers.slice(0, 4);
  const result = [...activeMembers];
  while (result.length < 4 && activeMembers.length > 0) {
    result.push(activeMembers[result.length % activeMembers.length]);
  }
  return result;
};

const getActiveDirectors = (directors: Director[]) => {
  // Filter active directors and sort by order - similar to sortedCards pattern
  return directors
    .filter((director) => director.isActive)
    .sort((a, b) => a.order - b.order);
};

// Create sorted directors array similar to sortedCards pattern
const getSortedDirectors = (directors: Director[]) => {
  return getActiveDirectors(directors || []);
};

// Utility function to handle backend image URLs
const getImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('https://admin.vvworx.com/')) {
    return `/api/proxy?url=${encodeURIComponent(imagePath)}`;
  }
  if (imagePath.startsWith('https://')) return imagePath;
  if (imagePath.startsWith('/uploads/')) {
    const fullUrl = `https://admin.vvworx.com${imagePath}`;
    return `/api/proxy?url=${encodeURIComponent(fullUrl)}`;
  }
  return imagePath;
};



export function AboutPageClient({ aboutContent }: { aboutContent: AboutPageContent }) {
  const rootRef = useRef<HTMLElement>(null);
  // navigationRef is now handled in layout - removed from here

  const headerRef = useRef<HTMLElement>(null);
  const headerTitleOneRef = useRef<HTMLHeadingElement>(null);
  const headerTitleTwoRef = useRef<HTMLHeadingElement>(null);
  const headerTitleThreeRef = useRef<HTMLHeadingElement>(null);
  const headerImageElementRef = useRef<HTMLImageElement>(null);

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

  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutSectionSvgRef = useRef<HTMLDivElement>(null);
  const aboutSectionTitleRefOne = useRef<HTMLSpanElement>(null);
  const aboutSectionTitleRefTwo = useRef<HTMLSpanElement>(null);
  const aboutSectionSvgTextBoxRef = useRef<HTMLDivElement>(null);
  const aboutSectionSvgTextBoxRef2 = useRef<HTMLDivElement>(null);

  const antronutSectionRef = useRef<HTMLElement>(null);
  const antronutSectionTextRef = useRef<HTMLDivElement>(null);
  const antronutImageElementRef = useRef<HTMLImageElement>(null);

  const directorContainerRef = useRef<HTMLDivElement>(null);

  // ---------- Team section ref --------------
  const teamSectionContainerRef = useRef<HTMLDivElement>(null);
  const teamRefStateOneRef = useRef<HTMLDivElement>(null);
  const teamRefStateTwoRef = useRef<HTMLDivElement>(null);
  const teamRefStateThreeRef = useRef<HTMLDivElement>(null);
  const teamStateFourRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery("min-width", 920) ?? false;

  const [loaderFinished, setLoaderFinished] = useState(false);

  // Get sorted directors for dynamic rendering - similar to sortedCards pattern
  const sortedCards = getSortedDirectors(
    aboutContent.directorSection?.directors ||
    defaultContent.directorSection?.directors ||
    []
  );

  // Get active team members for carousel animation
  const team =
    aboutContent.teamSection?.teamMembers
      ?.filter((member) => member.isActive)
      .sort((a, b) => a.order - b.order) ||
    defaultContent.teamSection?.teamMembers
      ?.filter((member) => member.isActive)
      .sort((a, b) => a.order - b.order) ||
    [];

  // Dynamic card refs
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize card refs based on sorted cards
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, sortedCards.length);
    for (let i = cardRefs.current.length; i < sortedCards.length; i++) {
      cardRefs.current[i] = null;
    }
  }, [sortedCards.length]);


  useEffect(() => {
    const timer = setTimeout(() => setLoaderFinished(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Navigation animation is now handled in layout.tsx

    // ---------- Initial Section Animation ----------

    ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 1.2}px`,

      scrub: false,
      onUpdate: ({ progress }) => {
        if (headerTitleOneRef.current && aboutSectionRef.current) {
          gsap.to(
            [
              headerTitleOneRef.current,
              headerTitleTwoRef.current,
              headerTitleThreeRef.current,
            ],
            {
              yPercent: -progress * 120, // Start below viewport
            }
          );

          gsap.to(aboutSectionRef.current, {
            yPercent: -progress * 12, // Start below viewport
          });
        }
      },
    });

    // ---------- About Section Animation ----------

    // Function to animate the about section elements
    const animateAboutSection = () => {
      const allImages = aboutSectionSvgTextBoxRef.current
        ? gsap.utils.toArray(
          aboutSectionSvgTextBoxRef.current.querySelectorAll("img")
        )
        : [];

      const allImages2 = aboutSectionSvgTextBoxRef2.current
        ? gsap.utils.toArray(
          aboutSectionSvgTextBoxRef2.current.querySelectorAll("img")
        )
        : [];

      gsap.to(allImages2, {
        yPercent: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.085,
      });

      gsap.to(
        [
          allImages,
          aboutSectionTitleRefOne.current,
          aboutSectionTitleRefTwo.current,
        ],
        {
          yPercent: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.085,
        }
      );
    };

    const resetAboutSection = () => {
      if (
        aboutSectionSvgTextBoxRef.current &&
        aboutSectionSvgTextBoxRef2.current
      ) {
        const allImages = aboutSectionSvgTextBoxRef.current
          ? gsap.utils.toArray(
            aboutSectionSvgTextBoxRef.current.querySelectorAll("img")
          )
          : [];

        const allImages2 = aboutSectionSvgTextBoxRef2.current
          ? gsap.utils.toArray(
            aboutSectionSvgTextBoxRef2.current.querySelectorAll("img")
          )
          : [];

        gsap.set(
          [
            allImages,
            aboutSectionTitleRefOne.current,
            aboutSectionTitleRefTwo.current,
          ],
          {
            yPercent: 100,
          }
        );

        gsap.set(allImages2, {
          yPercent: 100,
        });
      }
    };

    resetAboutSection();

    setTimeout(() => {
      ScrollTrigger.create({
        trigger: aboutSectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: false,
        onEnter: animateAboutSection,
        onLeave: resetAboutSection,
        onEnterBack: animateAboutSection,
        onLeaveBack: resetAboutSection,
        onRefresh: () => {
          const trigger = aboutSectionRef.current;
          if (trigger) {
            const rect = trigger.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const triggerTop = rect.top;
            const triggerBottom = rect.bottom;

            if (
              triggerTop <= windowHeight * 0.7 &&
              triggerBottom >= windowHeight * 0.3
            ) {
              animateAboutSection();
            } else {
              resetAboutSection();
            }
          }
        },
      });
    }, 100);

    // ---------- About Section Animation ----------
    ScrollTrigger.create({
      trigger: antronutSectionRef.current,
      start: "top bottom",
      end: `+=${window.innerHeight * 1.2}px`,
      scrub: false,
      onUpdate: ({ progress }) => {
        gsap.to([antronutSectionTextRef.current], {
          yPercent: -progress * 20, // Start below viewport
        });
      },
    });

    // ---------- Foundation Section Animation ----------

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

          // -------------------------- Frame 2 --------------------------
          const foundationContent1Y = mapProgress(
            progress - animatedFramesParts * 0,
            animatedFramesParts / 4, // how long you want the animation to last
            50,
            0
          );
          const foundationContent1Opacity = mapProgress(
            progress - animatedFramesParts * 0,
            animatedFramesParts / 4, // how long you want the animation to last
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
            animatedFramesParts / 4, // how long you want the animation to last
            -25,
            0
          );
          gsap.to(torus001.current.position, {
            y: torus1Progress,
            duration: 0,
          });

          // -------------------------- Frame 3 --------------------------

          const foundationContent2Y = mapProgress(
            progress - animatedFramesParts * 1,
            animatedFramesParts / 4, // how long you want the animation to last
            50,
            0
          );
          const foundationContent2pacity = mapProgress(
            progress - animatedFramesParts * 1,
            animatedFramesParts / 4, // how long you want the animation to last
            0,
            1
          );

          gsap.to(foundationContent2Ref.current, {
            yPercent: foundationContent2Y,
            opacity: foundationContent2pacity,
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
            direction: 0,
          });

          // -------------------------- Frame 4 --------------------------

          const foundationContent3Y = mapProgress(
            progress - animatedFramesParts * 2,
            animatedFramesParts / 4, // how long you want the animation to last
            50,
            0
          );
          const foundationContent3Opacity = mapProgress(
            progress - animatedFramesParts * 2,
            animatedFramesParts / 4, // how long you want the animation to last
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
            direction: 0,
          });

          // -------------------------- Frame 5 --------------------------

          const foundationContent4Y = mapProgress(
            progress - animatedFramesParts * 3,
            animatedFramesParts / 4, // how long you want the animation to last
            50,
            0
          );
          const foundationContent4Opacity = mapProgress(
            progress - animatedFramesParts * 3,
            animatedFramesParts / 4, // how long you want the animation to last
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
            direction: 0,
          });

          // -------------------------- Frame 6 --------------------------
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

    // ---------- Dynamic Director Section Animation (Stacking Effect) ----------
    // if (sortedDirectors.length > 0) {
    //   // Wait for DOM to be ready
    //   setTimeout(() => {
    //     const directorElements = directorContainerRef.current?.querySelectorAll('.director-card');

    //     if (directorElements && directorElements.length > 0) {
    //       // Initialize all directors: first one at y=0%, rest at y=100%
    //       Array.from(directorElements).forEach((element, index) => {
    //         gsap.set(element, {
    //           position: 'absolute',
    //           left: '50%',
    //           width: '100%',
    //           minHeight: '100vh',
    //           top: index === 0 ? "0%" : "100%",
    //           transform: 'translateX(-50%)',
    //           opacity: 1,
    //           zIndex: directorElements.length - index, // Higher z-index for later cards
    //         });
    //       });

    //       // Configuration for director scroll timing
    //       const directorCount = sortedDirectors.length;

    //       // Copy Dynamic Service Cards animation pattern - use timeline instead of onUpdate
    //       const tl = gsap.timeline({
    //         scrollTrigger: {
    //           trigger: directorContainerRef.current,
    //           start: "top top",
    //           end: "500%",
    //           pin: true,
    //           scrub: 1,
    //         },
    //       });

    //       // Dynamic directors animation - exactly like service cards
    //       Array.from(directorElements).forEach((directorElement, index) => {
    //         if (directorElement) {
    //           tl.to(
    //             directorElement,
    //             { top: window.innerWidth < 768 ? "10%" : "20%", duration: 1 },
    //             index === 0 ? "-=.9" : "-=.9"
    //           );
    //           // Scale down and fade all directors except the last one - like service cards
    //           if (index < directorElements.length - 1) {
    //             tl.to(directorElement, {
    //               transform: 'translateX(-50%) scale(0.5)',
    //               opacity: 0,
    //               duration: 1
    //             });
    //           }
    //         }
    //       });
    //     }
    //   }, 100);
    // }
    // ---------- Team Section Carousal Animation ----------
    if (
      teamRefStateOneRef.current &&
      teamRefStateTwoRef.current &&
      teamRefStateThreeRef.current &&
      teamStateFourRef.current
    ) {
      gsap.set(teamRefStateOneRef.current, {
        xPercent: -120,
        filter: `blur(${10}px)`,
        scale: 0.8,
      });

      gsap.set(teamRefStateTwoRef.current, {
        xPercent: 0,
        filter: `blur(${0}px)`,
        scale: 1,
      });

      gsap.set(teamRefStateThreeRef.current, {
        xPercent: 120,
        filter: `blur(${10}px)`,
        scale: 0.8,
      });

      gsap.set(teamStateFourRef.current, {
        xPercent: -120,
        filter: `blur(${10}px)`,
        scale: 0.6,
        opacity: 0,
      });

      const animatedFrames = [
        {
          xPercent: 0,
          filter: `blur(${0}px)`,
          scale: 1,
          duration: 1.5,
          ease: "power2.inOut",
          delay: 3,
        },

        {
          xPercent: 120,
          filter: `blur(${10}px)`,
          scale: 0.8,
          duration: 1.5,
          delay: 3,
        },

        {
          filter: `blur(${10}px)`,
          scale: 0.6,
          opacity: 0,
          duration: 1.5,
          delay: 3,
        },
        {
          filter: `blur(${10}px)`,
          scale: 0.8,
          opacity: 1,
          duration: 1.5,
          delay: 3,
        },
      ];

      let carousalIndex = 0;
      const duration = 1.2;
      const pause = 0;

      const loop = gsap.timeline({
        repeat: -1,
        defaults: { duration, ease: "power2.inOut" },
      });

      // Step 1: Focus on member 2 (center)
      loop
        .to(teamRefStateOneRef.current, { ...animatedFrames[0] })
        .to(teamRefStateOneRef.current, { ...animatedFrames[1] })
        .to(teamRefStateOneRef.current, {
          ...animatedFrames[2],
        })
        .call(() => {
          if (team.length > 4) {
            const container = teamRefStateOneRef.current;
            if (container) {
              const nameP = container.querySelector(".team-name") as any;
              const roleP = container.querySelector(".team-role");

              let renderIndex =
                team.length < 4
                  ? 2
                  : Math.max(0, (carousalIndex + 3) % team.length);

              if (nameP) nameP.textContent = team[renderIndex].name;
              if (roleP) roleP.textContent = team[renderIndex].role;
              // Update image
              const img = container.querySelector(".team-image") as any;

              if (img) {
                img.src = getImageUrl(team[renderIndex].image);
                img.alt = "New Name";
              }

              carousalIndex++;
            }
          }
        })
        .to(teamRefStateOneRef.current, { xPercent: -120, duration: 0 })
        .to(teamRefStateOneRef.current, { ...animatedFrames[3] })
        .to({}, { duration: pause });

      const loop2 = gsap.timeline({
        repeat: -1,
        defaults: { duration, ease: "power2.inOut" },
      });

      // Step 2: Focus on member 3 (center)
      loop2
        .to(teamRefStateTwoRef.current, { ...animatedFrames[1] })
        .to(teamRefStateTwoRef.current, {
          ...animatedFrames[2],
        })
        .call(() => {
          if (team.length > 4) {
            const container = teamRefStateTwoRef.current;
            if (container) {
              const nameP = container.querySelector(".team-name") as any;
              const roleP = container.querySelector(".team-role");

              let renderIndex =
                team.length < 4
                  ? 0
                  : Math.max(0, (carousalIndex + 3) % team.length);

              if (nameP) nameP.textContent = team[renderIndex].name;
              if (roleP) roleP.textContent = team[renderIndex].role;
              // Update image
              const img = container.querySelector(".team-image") as any;

              if (img) {
                img.src = getImageUrl(team[renderIndex].image);
                img.alt = "New Name";
              }

              carousalIndex++;
            }
          }
        })
        .to(teamRefStateTwoRef.current, { xPercent: -120, duration: 0 })
        .to(teamRefStateTwoRef.current, { ...animatedFrames[3] })
        .to(teamRefStateTwoRef.current, { ...animatedFrames[0] })
        .to({}, { duration: pause });

      const loop3 = gsap.timeline({
        repeat: -1,
        defaults: { duration, ease: "power2.inOut" },
      });

      // Step 2: Focus on member 3 (center)
      loop3
        .to(teamRefStateThreeRef.current, {
          ...animatedFrames[2],
        })
        .call(() => {
          if (team.length > 4) {
            const container = teamRefStateThreeRef.current;
            if (container) {
              const nameP = container.querySelector(".team-name") as any;
              const roleP = container.querySelector(".team-role");

              let renderIndex =
                team.length < 4
                  ? 1
                  : Math.max(0, (carousalIndex + 3) % team.length);

              // if(nameP.textContent === team[renderIndex].name){
              //   renderIndex = renderIndex - 1
              // }

              if (nameP) nameP.textContent = team[renderIndex].name;
              if (roleP) roleP.textContent = team[renderIndex].role;
              // Update image
              const img = container.querySelector(".team-image") as any;

              if (img) {
                img.src = getImageUrl(team[renderIndex].image);
                img.alt = "New Name";
              }

              carousalIndex++;
            }
          }
        })
        .to(teamRefStateThreeRef.current, { xPercent: -120, duration: 0 })
        .to(teamRefStateThreeRef.current, { ...animatedFrames[3] })
        .to(teamRefStateThreeRef.current, { ...animatedFrames[0] })
        .to(teamRefStateThreeRef.current, { ...animatedFrames[1] })
        .to({}, { duration: pause });

      const loop4 = gsap.timeline({
        repeat: -1,
        defaults: { duration, ease: "power2.inOut" },
      });

      // Step 2: Focus on member 3 (center)
      loop4
        .call(() => {
          if (team.length > 4) {
            const container = teamStateFourRef.current;
            if (container) {
              const nameP = container.querySelector(".team-name") as any;
              const roleP = container.querySelector(".team-role");

              let renderIndex =
                team.length < 4
                  ? 2
                  : Math.max(0, (carousalIndex + 3) % team.length);

              // if(nameP.textContent === team[renderIndex].name){
              //   renderIndex = renderIndex - 1
              // }

              if (nameP) nameP.textContent = team[renderIndex].name;
              if (roleP) roleP.textContent = team[renderIndex].role;
              // Update image
              const img = container.querySelector(".team-image") as any;

              if (img) {
                img.src = getImageUrl(team[renderIndex].image);
                img.alt = "New Name";
              }

              carousalIndex++;
            }
          }
        })
        .to(teamStateFourRef.current, { xPercent: -120, duration: 0 })
        .to(teamStateFourRef.current, { ...animatedFrames[3] })
        .to(teamStateFourRef.current, { ...animatedFrames[0] })
        .to(teamStateFourRef.current, { ...animatedFrames[1] })
        .to(teamStateFourRef.current, {
          ...animatedFrames[2],
        })
        .to({}, { duration: pause });
    }

    // Handle screen resize to fix timeline issues
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Services Section Animation
  useEffect(() => {
    const servicesCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: directorContainerRef.current,
          start: "top top",
          end: "300%",
          pin: true,
          scrub: 1,
        },
      });



      // Dynamic cards animation
      cardRefs.current.forEach((cardRef, index) => {
        if (cardRef) {
          tl.to(
            cardRef,
            { top: window.innerWidth < 768 ? "10%" : "20%", duration: 1 },
            "-=.9"
          );
          if (index < cardRefs.current.length - 1) {
            tl.to(cardRef, { scale: 0.5, opacity: 0, duration: 1 });
          }
        }
      });
    }, directorContainerRef);

    return () => {
      servicesCtx.revert();
    };
  }, [sortedCards]);


  useParallax([
    { wrapper: headerRef, image: headerImageElementRef } as any,
    { wrapper: antronutSectionRef, image: antronutImageElementRef } as any,
  ]);

  return (
    <section ref={rootRef}>
      <section
        className="z-10 bg-[black]"
        style={
          isDesktop
            ? {
              overflowY: loaderFinished ? "visible" : "hidden",
              height: loaderFinished ? "auto" : "100vh",
              position: loaderFinished ? "static" : "fixed",

              overflowX: "hidden",
            }
            : {
              overflowY: "visible",
              height: "auto",
              position: "static",
              overflowX: "hidden",
            }
        }
      >
        {/* Header is already included in layout.tsx */}
        <section
          ref={headerRef}
          className={`relative flex flex-col md:flex-row md:gap-20 items-end justify-between px-4 sm:px-8 lg:px-20 bg-gradient-to-tr ${aboutContent.headerSection?.backgroundGradient || "from-[#6210FF] to-[#BE2FF4]"} text-white overflow-hidden`}
        >
          <div className="lg:pb-[300px] pt-[100px] w-full pl-[28px] lg:pl-[0] px-auto ">
            <div>
              <h1
                ref={headerTitleOneRef}
                className="font-[400] lg:font-[500] text-[45px]  lg:text-[80px] leading-[55px] lg:leading-[95px]"
              >
                {aboutContent.headerSection?.titleLine1 || "Your Voice In"}{" "}
              </h1>
            </div>
            <h1
              ref={headerTitleTwoRef}
              className="font-[400] lg:font-[500] text-[45px]  lg:text-[80px] leading-[55px] lg:leading-[95px]"
            >
              {" "}
              {aboutContent.headerSection?.titleLine2 || "The Future Of"}
            </h1>

            <h1
              ref={headerTitleThreeRef}
              className="font-[400] lg:font-[500] text-[45px]  lg:text-[80px] leading-[55px] lg:leading-[95px]"
            >
              {" "}
              {aboutContent.headerSection?.titleLine3 || "Marketing."}
            </h1>
          </div>

          {/* Right */}
          <div
            // ref={headerImageWrapperRef}
            className="relative w-full flex items-center justify-center lg:justify-center transition-transform duration-[125ms] [transition-timing-function:var(--base-ease)]"
            style={
              {
                // These CSS variables can be set globally or inline as needed
                "--base-duration": "500ms",
                "--base-ease": "cubic-bezier(0.25,0.46,0.45,0.84)",
              } as React.CSSProperties
            }
          >
            <div>
              <Image
                src={getImageUrl(
                  aboutContent.headerSection?.decorativeImage ||
                  "/Markofinnovation.png"
                )}
                alt="Arc"
                width={610}
                height={400}
                className="absolute z-0 w-[90%] lg:w-[609.53px] h-auto object-contain top-[35%] left-[45%]   lg:top-1/2 lg:left-1/2 -translate-x-[43%] -translate-y-[90%]"
              />

              <Image
                ref={headerImageElementRef}
                src={getImageUrl(
                  aboutContent.headerSection?.heroImage || "/Marketingwoman.png"
                )}
                alt="Marketing Woman"
                width={570}
                height={600}
                className="relative z-0 w-[95%] lg:w-[570px] h-auto object-contain  transition-transform [transition-duration:var(--base-duration)] [transition-timing-function:var(--base-ease)]"
              />
            </div>
          </div>
        </section>

        <section
          style={{
            backgroundColor:
              aboutContent.aboutUsSection?.backgroundColor || "#EEF0FF",
          }}
        >
          <section
            ref={aboutSectionRef}
            className="lg:min-h-[60vh] flex flex-col items-center justify-start px-4 lg:py-16 z-120"
            style={{
              backgroundColor:
                aboutContent.aboutUsSection?.backgroundColor || "#EEF0FF",
            }}
          >
            <div ref={aboutSectionSvgRef}>
              <div className="relative left-[2%] lg:left-[4%] scale-[0.32] lg:scale-[0.82] xl:scale-[0.82] w-full top-[-30px] lg:top-[100px]">
                <div
                  ref={aboutSectionSvgTextBoxRef}
                  className="flex items-center justify-start"
                >
                  <div className="flex relative left-[-12%] overflow-hidden w-[370px] ">
                    <Image
                      src={"/title/1.svg"}
                      alt="Title part 1"
                      width={132}
                      height={130}
                      className="w-auto h-auto object-contain"
                      unoptimized
                    />
                    <Image
                      src={"/title/2.svg"}
                      alt="Title part 2"
                      width={111}
                      height={131}
                      className="w-auto h-auto object-contain"
                      unoptimized
                    />
                    <Image
                      src={"/title/3.svg"}
                      alt="Title part 3"
                      width={132}
                      height={129}
                      className="w-auto h-auto object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="flex relative left-[-7.5%] overflow-hidden w-[370px]">
                    <Image
                      src={"/title/4.svg"}
                      alt="Title part 4"
                      width={146}
                      height={106}
                      className="w-auto h-auto object-contain"
                      unoptimized
                    />
                    <Image
                      src={"/title/5.svg"}
                      alt="Title part 5"
                      width={108}
                      height={106}
                      className="w-auto h-auto object-contain"
                      unoptimized
                    />
                    <Image
                      src={"/title/6.svg"}
                      alt="Title part 6"
                      width={91}
                      height={105}
                      className="w-auto h-auto object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                <div
                  ref={aboutSectionSvgTextBoxRef2}
                  className="flex items-center justify-center mt-[-60px]  gap-[5px]"
                >
                  <div className="flex relative left-[-30px] overflow-hidden  w-[230px]">
                    <Image
                      src={"/title/7.svg"}
                      alt="Title part 7"
                      width={89}
                      height={93}
                      className="w-auto h-auto object-contain"
                      unoptimized
                    />
                    <Image
                      src={"/title/8.svg"}
                      alt="Title part 8"
                      width={27}
                      height={137}
                      className="w-auto h-auto object-contain"
                      unoptimized
                    />
                    <Image
                      src={"/title/9.svg"}
                      alt="Title part 9"
                      width={84}
                      height={132}
                      className="w-auto h-auto object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="flex mt-[-20px] overflow-hidden w-[490px]">
                    <Image
                      src={"/title/10.svg"}
                      alt="Title part 10"
                      width={178}
                      height={129}
                      className="w-auto h-auto object-contain"
                      unoptimized
                    />
                    <Image
                      src={"/title/11.svg"}
                      alt="Title part 11"
                      width={133}
                      height={134}
                      className="w-auto h-auto object-contain"
                      unoptimized
                    />
                    <Image
                      src={"/title/12.svg"}
                      alt="Title part 12"
                      width={179}
                      height={129}
                      className="w-auto h-auto object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="flex relative top-[-70px] overflow-hidden w-[310px]">
                    <Image
                      src={"/title/13.svg"}
                      alt="Title part 13"
                      width={289}
                      height={328}
                      className="w-auto h-auto object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              <div className="mt-[-15%] lg:mt-[60px] mb-[20px]  ">
                <p
                  className="text-[18px] lg:text-4xl font-[500] text-center mt-[0px] mb-[20px]  leading-[120%] tracking-[2%] relative overflow-hidden"
                  style={{
                    color: aboutContent.aboutUsSection?.textColor || "#6210FF",
                  }}
                >
                  <span
                    ref={aboutSectionTitleRefOne}
                    className={"relative block"}
                  >
                    {aboutContent.aboutUsSection?.mainTextLine1 ||
                      "'Vua' is the Voice that will lead the dialogue"}{" "}
                  </span>
                </p>
                <p
                  className="text-[18px] lg:text-4xl font-[500] text-center mt-[0px]  leading-[120%] tracking-[2%] relative overflow-hidden"
                  style={{
                    color: aboutContent.aboutUsSection?.textColor || "#6210FF",
                  }}
                >
                  <span
                    ref={aboutSectionTitleRefTwo}
                    className={"relative block"}
                  >
                    {aboutContent.aboutUsSection?.mainTextLine2 ||
                      "for a future-forward world of Marketing."}
                  </span>
                </p>
              </div>
            </div>
          </section>
        </section>

        <section
          ref={antronutSectionRef}
          className="relative min-h-screen w-full bg-cover bg-center text-white px-6 py-16 lg:py-28"
          style={{
            backgroundImage: `url('${getImageUrl(aboutContent.whoAreWeSection?.backgroundImage || "/Whoarewe.png")}')`,
          }}
        >
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12  ">
            {/* Left Side: */}
            <div
              className="relative w-full lg:w-1/2  lg:block transition-transform duration-[125ms] [transition-timing-function:var(--base-ease)]"
              style={
                {
                  // These CSS variables can be set globally or inline as needed
                  "--base-duration": "500ms",
                  "--base-ease": "cubic-bezier(0.25,0.46,0.45,0.84)",
                } as React.CSSProperties
              }
            >
              <Image
                src={getImageUrl(
                  aboutContent.whoAreWeSection?.leftImages?.decorativeArc ||
                  "/Layer_1.png"
                )}
                alt="Decorative Arc"
                width={1200}
                height={800}
                unoptimized={true}
                className="absolute top-1/2 left-1/2 transform -translate-x-[38%] -translate-y-[60%] w-[1200px] z-0 "
              />

              <Image
                ref={antronutImageElementRef}
                src={getImageUrl(
                  aboutContent.whoAreWeSection?.leftImages?.astronaut ||
                  "/astro.png"
                )}
                alt="Astronaut"
                width={519}
                height={1000}
                unoptimized={true}
                className="relative z-10 mx-auto w-[519px] h-auto transition-transform [transition-duration:var(--base-duration)] [transition-timing-function:var(--base-ease)]"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Right Side */}
            <div
              className="w-full lg:w-1/2 text-left"
              ref={antronutSectionTextRef}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-[67px] font-thin mb-[77px] petrovsans-regular hidden lg:block ">
                {aboutContent.whoAreWeSection?.title || "Who Are We?"}
              </h2>
              <h2 className="text-[50px] lg:text-[67px] font-thin mb-[30px] outfit-light leading-[58px] lg:hidden ">
                {aboutContent.whoAreWeSection?.title?.includes(" ")
                  ? aboutContent.whoAreWeSection.title
                    .split(" ")
                    .map((word, index) => (
                      <span key={index}>
                        {word}
                        {index <
                          aboutContent.whoAreWeSection!.title.split(" ")
                            .length -
                          1 ? (
                          <br />
                        ) : (
                          ""
                        )}
                      </span>
                    ))
                  : aboutContent.whoAreWeSection?.title || "Who Are We?"}
              </h2>
              <p className="text-lg lg:text-[19.69px] font-[400] leading-relaxed mb-4 lg:font-[300]">
                {aboutContent.whoAreWeSection?.content?.paragraph1 ||
                  "We are a future-focused Marketing agency that aims to help brands leverage the latest in marketing creativity and technology to achieve their Growth KPIs."}
                <span className="font-[500] lg:font-[500] text-white">
                  {" "}
                  {aboutContent.whoAreWeSection?.content?.highlightText ||
                    "Our 360-degree service portfolio of creative, digital and Mar-Tech solutions"}{" "}
                </span>
                {aboutContent.whoAreWeSection?.content
                  ?.paragraph1Continuation ||
                  "empowers brands to lead, not follow, in a world shaped by innovation."}
              </p>
              <p className="text-lg lg:text-[19.69px] font-[400] leading-relaxed mb-4 lg:font-[300]">
                {aboutContent.whoAreWeSection?.content?.paragraph2 ||
                  "VUA is more than a brand-it's a movement for those who seek to lead the next era of change."}
              </p>
            </div>
          </div>
        </section>

        <section
          ref={foundationSectionRef}
          className="relative w-screen h-screen text-zinc-900 overflow-hidden"
          style={{
            backgroundColor:
              aboutContent.foundationSection?.backgroundColor || "#6310FF",
          }}
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
                {aboutContent.foundationSection?.title?.includes(" ") ? (
                  aboutContent.foundationSection.title
                    .split(" ")
                    .map((word, index) => (
                      <h2
                        key={index}
                        className="text-[50px] text-white font-[400] m-0 leading-[45px] max-[350px]:text-[40px] lg:text-6xl"
                      >
                        {word}
                      </h2>
                    ))
                ) : (
                  <h2 className="text-[50px] text-white font-[400] m-0 leading-[45px] max-[350px]:text-[40px] lg:text-6xl">
                    {aboutContent.foundationSection?.title || "Our Foundation"}
                  </h2>
                )}
              </div>
            </div>
          </div>

          <div
            className="absolute right-0 bottom-[40px] w-full h-screen z-[2] flex flex-col items-start justify-end pl-8 gap-7
            max-[350px]:gap-[14px]
             lg:w-1/2  lg:gap-[5.5%] lg:bottom-0 lg:justify-center
            "
          >
            {aboutContent.foundationSection?.foundations
              ?.slice(0, 4)
              .map((foundation, index) => {
                const refs = [
                  foundationContent1Ref,
                  foundationContent2Ref,
                  foundationContent3Ref,
                  foundationContent4Ref,
                ];
                return (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div ref={refs[index]}>
                      <h2 className="text-[35px] text-white font-medium m-0  max-[350px]:text-[27px]  lg:text-[3rem]">
                        {foundation.title}
                      </h2>
                      <p className="text-base text-white font-medium m-0">
                        {foundation.description}
                      </p>
                    </div>
                  </div>
                );
              }) ||
              [
                // Fallback to default foundations if no data
                {
                  title: "Creativity",
                  description: "Creativity that inspires",
                },
                {
                  title: "Innovation",
                  description: "Technology that keeps You ahead",
                },
                {
                  title: "Strategic Thinking",
                  description: "Strategy that always makes you win",
                },
                {
                  title: "Customer Centricity",
                  description: 'Everything is about "You"',
                },
              ].map((foundation, index) => {
                const refs = [
                  foundationContent1Ref,
                  foundationContent2Ref,
                  foundationContent3Ref,
                  foundationContent4Ref,
                ];
                return (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div ref={refs[index]}>
                      <h2 className="text-[35px] text-white font-medium m-0  max-[350px]:text-[27px]  lg:text-[3rem]">
                        {foundation.title}
                      </h2>
                      <p className="text-base text-white font-medium m-0">
                        {foundation.description}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        <section
          ref={directorContainerRef}
          className="relative w-screen min-h-screen text-zinc-900 overflow-hidden"
          style={{
            backgroundColor:
              aboutContent.directorSection?.backgroundColor || "#EEF0FF",
          }}
        >
          <h2
            className="text-[48px] sm:text-[54.5px] lg:text-[94.5px] font-[500] text-center text-[#6210FF] mb-4"
            style={{
              position: "absolute",
              left: "50%",
              width: "100%",
              top: "7%",
              zIndex: 100,
              willChange: "transform",
              transform: "translateX(-50%)",
            }}
          >
            {aboutContent.directorSection?.sectionTitle || "Director"}
          </h2>

          {/* Dynamic Director Cards */}
          {sortedCards.map((director: any, index: any) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`absolute ${index === 0 ? "top-[20%]" : "top-[100%]"} z-${index * 10} w-full`}
            // style={{ boxShadow: "0 20px 50px -10px rgba(190, 47, 244, 0.3)" }}
            >
              <section
                key={director.name + director.order}
                className="director-card bg-[transparent] py-[0] px-4 sm:px-6 md:px-20"
              >
                <div
                  className="pt-[10px] sm:pt-[140px] lg:pt-16 pb-5"
                  style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    gap: "5%",
                  }}
                >
                  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-[12px] sm:gap-[20px] lg:gap-12 items-start">
                    <div
                      className="col-span-1 md:col-span-5 flex justify-center mb-4 md:mb-0"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className="relative h-[200px] w-[180px] sm:h-[235px] sm:w-[235px] lg:h-[375px] lg:w-[70%] overflow-hidden">
                        <Image
                          src={getImageUrl(director.image)}
                          alt={director.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <div>
                        <div className="overflow-hidden height-[fit-content]">
                          <h2 className="relative text-[18px] sm:text-[20.5px] lg:text-[30.5px] font-[500] text-center text-[#6210FF] mb-0 mt-4">
                            {director.name}
                          </h2>
                        </div>
                        <div className="overflow-hidden height-[fit-content]">
                          <p className="relative text-[14px] sm:text-[16.5px] lg:text-[25.5px] font-[500] text-center text-[#BE2FF4] mt-[-5px]">
                            {director.role}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-span-1 md:col-span-7 text-[#6210FF] leading-[1.4] sm:leading-relaxed tracking-[0.08em] space-y-4 relative lg:h-[100%] px-2 sm:px-0"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      <div>
                        {director.description
                          ?.split("\n")
                          .map((paragraph: any, paragraphIndex: any) => (
                            <div key={paragraphIndex}>
                              <p
                                className="text-[12px] sm:text-[14px] lg:text-[17px] text-justify"
                                dangerouslySetInnerHTML={{ __html: paragraph }}
                              ></p>
                              {paragraphIndex <
                                (director.description?.split("\n").length ||
                                  1) -
                                1 && <br />}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
          {/* {sortedDirectors.map((director, index) => (
            <section
              key={director.name + director.order}
              className="director-card bg-[transparent] py-[0] px-4 sm:px-6 md:px-20"
            >
              <div
                className="pt-[10px] sm:pt-[140px] lg:pt-16 pb-5"
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  gap: "5%",
                }}
              >
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-[12px] sm:gap-[20px] lg:gap-12 items-start">
                  <div
                    className="col-span-1 md:col-span-5 flex justify-center mb-4 md:mb-0"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div className="relative h-[200px] w-[180px] sm:h-[235px] sm:w-[235px] lg:h-[375px] lg:w-[70%] overflow-hidden">
                      <Image
                        src={director.image}
                        alt={director.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <div className="overflow-hidden height-[fit-content]">
                        <h2 className="relative text-[18px] sm:text-[20.5px] lg:text-[30.5px] font-[500] text-center text-[#6210FF] mb-0 mt-4">
                          {director.name}
                        </h2>
                      </div>
                      <div className="overflow-hidden height-[fit-content]">
                        <p className="relative text-[14px] sm:text-[16.5px] lg:text-[25.5px] font-[500] text-center text-[#BE2FF4] mt-[-5px]">
                          {director.role}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-span-1 md:col-span-7 text-[#6210FF] leading-[1.4] sm:leading-relaxed tracking-[0.08em] space-y-4 relative lg:h-[100%] px-2 sm:px-0"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    <div>
                      {director.description?.split('\n').map((paragraph, paragraphIndex) => (
                        <div key={paragraphIndex}>
                          <p className="text-[12px] sm:text-[14px] lg:text-[17px] text-justify" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                          {paragraphIndex < (director.description?.split('\n').length || 1) - 1 && <br />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))} */}
        </section>

        <section
          className="relative max-sm:pt-[50px] text-white px-4 sm:px-6 md:px-8 text-center h-[100vh] w-[100vw]"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            overflowX: "hidden",
            width: "100vw",
            backgroundColor:
              aboutContent.teamSection?.backgroundColor || "black",
          }}
        >
          <h2
            className={`text-[54.5px] lg:text-[94.5px] font-[500] bg-gradient-to-r ${aboutContent.teamSection?.titleGradient || "from-[#6210FF] to-[#BE2FF4]"} bg-clip-text text-transparent block mb-[60px]`}
          >
            {aboutContent.teamSection?.sectionTitle || "Our Team"}
          </h2>

          <div
            ref={teamSectionContainerRef}
            className="flex justify-center gap-24 sm:gap-32 md:gap-40 lg:gap-60 xl:gap-72 flex-wrap md:flex-nowrap"
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              overflowX: "hidden",
            }}
          >
            {getTeamSlice(
              aboutContent.teamSection?.teamMembers ||
              defaultContent.teamSection?.teamMembers ||
              []
            ).map((member, index) => {
              return (
                <div
                  ref={
                    index === 0
                      ? teamRefStateOneRef
                      : index === 1
                        ? teamRefStateTwoRef
                        : index === 2
                          ? teamRefStateThreeRef
                          : teamStateFourRef
                  }
                  key={index}
                  className={`absolute flex flex-col items-center
                `}
                >
                  <div className="relative w-[280px] h-[340px] sm:w-[300px] sm:h-[360px] md:w-[280px] md:h-[340px] lg:w-[260px] lg:h-[320px] xl:w-[300px] xl:h-[360px] mb-3 z-20">
                    <Image
                      className="team-image w-full h-full object-cover"
                      src={getImageUrl(member.image)}
                      alt={member.name}
                      width={300}
                      height={360}
                    />
                  </div>

                  <div className="text-center mt-3">
                    <p className="team-name text-lg sm:text-xl md:text-lg lg:text-xl xl:text-2xl font-semibold leading-tight">
                      {member.name.split(" ")[0]} {member.name.split(" ")[1]}
                    </p>
                    <p className="team-role text-sm sm:text-base md:text-sm lg:text-base xl:text-lg text-[#BE2FF4] font-semibold mt-1 mb-[140px]">
                      {member.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </section>
  );
}
