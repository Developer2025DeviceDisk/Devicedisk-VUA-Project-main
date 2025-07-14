"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Observer from "gsap/Observer";
import SplitText from "gsap/SplitText";
import Lenis from "@studio-freight/lenis";
import { useParallax } from "@/hooks/useParrallax";
import { RingScene } from "./Scene";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Header from "./Header";

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

const team = [
  {
    name: "Gourav Bhatt",
    role: "Digital Marketing",
    image: "/Group 30.png",
  },
  {
    name: "Dishank Shah",
    role: "Chief Business Officer",
    image: "/Group 32.png",
  },
  {
    name: "Heramb Gharat",
    role: "Creative Head",
    image: "/Group 33.png",
  },
  {
    name: "Dishank Shah",
    role: "Chief Business Officer",
    image: "/Group 32.png",
  },
];
const getTeamSlice = (
  team: Array<{ name: string; role: string; image: string }>
) => {
  if (team.length >= 4) return team.slice(0, 4);
  const result = [...team];
  while (result.length < 4) {
    result.push(team[result.length - 1]);
  }
  return result;
};

export default function AboutPage() {
  const rootRef = useRef<HTMLElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

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
  const directionCarousalOne = useRef<HTMLElement>(null);
  const directionCarousalTwo = useRef<HTMLElement>(null);

  const directorOneImageRef = useRef<HTMLDivElement>(null);
  const directorOneNameRef = useRef<HTMLHeadingElement>(null);
  const directorOneSubNameRef = useRef<HTMLParagraphElement>(null);
  const directorOneTextRef = useRef<HTMLDivElement>(null);

  const directorTwoImageRef = useRef<HTMLDivElement>(null);
  const directorTwoNameRef = useRef<HTMLHeadingElement>(null);
  const directorTwoSubNameRef = useRef<HTMLParagraphElement>(null);
  const directorTwoTextRef = useRef<HTMLDivElement>(null);

  // ---------- Team section ref --------------
  const teamSectionContainerRef = useRef<HTMLDivElement>(null);
  const teamRefStateOneRef = useRef<HTMLDivElement>(null);
  const teamRefStateTwoRef = useRef<HTMLDivElement>(null);
  const teamRefStateThreeRef = useRef<HTMLDivElement>(null);
  const teamStateFourRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery("min-width", 920) ?? false;

  const [loaderFinished, setLoaderFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaderFinished(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // ---------- Navigation Animation ----------
    ScrollTrigger.create({
      start: "top -100",
      end: 99999,
      onUpdate: (self) => {
        if (navigationRef.current) {
          const direction = self.direction;
          const progress = self.progress;

          if (direction === 1 && self.scroll() > 100) {
            // Scrolling down and past 100px - hide navigation
            gsap.to(navigationRef.current, {
              y: "-100%",
              duration: 0.25,
              ease: "power2.out",
            });
          } else if (direction === -1) {
            // Scrolling up - show navigation
            gsap.to(navigationRef.current, {
              y: "0%",
              duration: 0.25,
              ease: "power2.out",
            });
          }
        }
      },
    });

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

    ScrollTrigger.create({
      trigger: aboutSectionRef.current,
      start: "top 50%",
      end: `+=${window.innerHeight * 1.2}px`,

      scrub: false,
      onEnter: () => {
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
      },
    });

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

        if (torus001.current && modalGroupRef.current && torus002.current) {
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
          torus.current
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
        }
      },
    });

    // ---------- Director Section Animation ----------
    if (directionCarousalTwo.current) {
      gsap.set(directionCarousalTwo.current, {
        xPercent: -50, // Center horizontally
        opacity: 1, // Hidden initially
      });

      gsap.set(directorTwoImageRef.current, {
        scale: 0.3,
        opacity: 0,
      });

      gsap.set(directorTwoTextRef.current, {
        yPercent: 100,
        opacity: 0,
      });
    }
    if (directionCarousalOne.current) {
      gsap.set(directionCarousalOne.current, {
        xPercent: -50, // Center horizontally
        opacity: 1, // Hidden initially
      });

      gsap.set(directorOneImageRef.current, {
        scale: 0.3,
        opacity: 0,
      });

      gsap.set(directorOneTextRef.current, {
        yPercent: 100,
        opacity: 0,
      });
    }

    ScrollTrigger.create({
      trigger: directorContainerRef.current,
      start: "top 75%",
      end: "top top",
      scrub: true,
      onUpdate: ({ progress }) => {
        const directorOneTextOpacity = mapProgress(progress, 1, 0, 1);

        const directorOneTextY = mapProgress(progress, 1, 100, 0);
        const directorImageScale = mapProgress(progress, 1, 0.3, 1);

        gsap.to(directorOneTextRef.current, {
          yPercent: directorOneTextY,
          opacity: directorOneTextOpacity,
        });

        gsap.set(directorOneImageRef.current, {
          scale: directorImageScale,
          opacity: directorOneTextOpacity,
        });
      },
    });

    ScrollTrigger.create({
      trigger: directorContainerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 2}px`,
      pin: true,
      pinSpacing: true,
      scrub: false,
      onUpdate: ({ progress }) => {
        // Top Card animate
        // --------------- Part 1 ---------------
        const directorOneTextOpacity = mapProgress(progress - 0.2, 0.4, 1, 0);

        const directorOneTextY = mapProgress(progress - 0.2, 0.4, 0, -50);
        const directorImageScale = mapProgress(progress - 0.2, 0.4, 1, 0.2);

        gsap.to(directorOneTextRef.current, {
          yPercent: directorOneTextY,
          opacity: directorOneTextOpacity,
        });

        gsap.set(directorOneImageRef.current, {
          scale: directorImageScale,
          opacity: directorOneTextOpacity,
        });

        // Part 2 initialize
        {
          const directorTwoTextOpacity = mapProgress(progress - 0.4, 0.4, 0, 1);

          const directorTwoTextY = mapProgress(progress - 0.4, 0.4, 100, 0);
          const directorImageScale = mapProgress(progress - 0.4, 0.4, 0.3, 1);

          gsap.to(directorTwoTextRef.current, {
            yPercent: directorTwoTextY,
            opacity: directorTwoTextOpacity,
          });

          gsap.set(directorTwoImageRef.current, {
            scale: directorImageScale,
            opacity: directorTwoTextOpacity,
          });
        }
      },
    });
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
                team.length < 4 ? 2 : (carousalIndex + 3) % team.length;

              if (nameP) nameP.textContent = team[renderIndex].name;
              if (roleP) roleP.textContent = team[renderIndex].role;
              // Update image
              const img = container.querySelector(".team-image") as any;

              if (img) {
                img.src = team[renderIndex].image;
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
                team.length < 4 ? 0 : (carousalIndex + 3) % team.length;

              if (nameP) nameP.textContent = team[renderIndex].name;
              if (roleP) roleP.textContent = team[renderIndex].role;
              // Update image
              const img = container.querySelector(".team-image") as any;

              if (img) {
                img.src = team[renderIndex].image;
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
                team.length < 4 ? 1 : (carousalIndex + 3) % team.length;

              // if(nameP.textContent === team[renderIndex].name){
              //   renderIndex = renderIndex - 1
              // }

              if (nameP) nameP.textContent = team[renderIndex].name;
              if (roleP) roleP.textContent = team[renderIndex].role;
              // Update image
              const img = container.querySelector(".team-image") as any;

              if (img) {
                img.src = team[renderIndex].image;
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
                team.length < 4 ? 2 : (carousalIndex + 3) % team.length;

              // if(nameP.textContent === team[renderIndex].name){
              //   renderIndex = renderIndex - 1
              // }

              if (nameP) nameP.textContent = team[renderIndex].name;
              if (roleP) roleP.textContent = team[renderIndex].role;
              // Update image
              const img = container.querySelector(".team-image") as any;

              if (img) {
                img.src = team[renderIndex].image;
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

  useParallax([
    { wrapper: headerRef, image: headerImageElementRef } as any,
    { wrapper: antronutSectionRef, image: antronutImageElementRef },
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
        <Header ref={navigationRef} />
        <section
          ref={headerRef}
          className="relative flex flex-col md:flex-row md:gap-20 items-end justify-between px-4 sm:px-8 lg:px-20 bg-gradient-to-tr from-[#6210FF] to-[#BE2FF4] text-white overflow-hidden"
        >
          <div className="lg:pb-[300px] pt-[0] pt-[100px] w-full pl-[28px] lg:pl-[0] px-auto ">
            <div>
              <h1
                ref={headerTitleOneRef}
                className="font-[400] lg:font-[500] text-[45px]  lg:text-[80px] leading-[55px] lg:leading-[95px]"
              >
                Your Voice In{" "}
              </h1>
            </div>
            <h1
              ref={headerTitleTwoRef}
              className="font-[400] lg:font-[500] text-[45px]  lg:text-[80px] leading-[55px] lg:leading-[95px]"
            >
              {" "}
              The Future Of
            </h1>

            <h1
              ref={headerTitleThreeRef}
              className="font-[400] lg:font-[500] text-[45px]  lg:text-[80px] leading-[55px] lg:leading-[95px]"
            >
              {" "}
              Marketing.
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
              <img
                src="/Markofinnovation.png"
                alt="Arc"
                className="absolute z-0 w-[90%] lg:w-[609.53px] h-auto object-contain top-[35%] left-[45%]   lg:top-1/2 lg:left-1/2 -translate-x-[43%] -translate-y-[90%]"
              />

              <img
                ref={headerImageElementRef}
                src="/Marketingwoman.png"
                alt="Marketing Woman"
                className="relative z-0 w-[95%] lg:w-[570px] h-auto object-contain  transition-transform [transition-duration:var(--base-duration)] [transition-timing-function:var(--base-ease)]"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#EEF0FF]">
          <section
            ref={aboutSectionRef}
            className="lg:min-h-[60vh] flex flex-col items-center justify-start bg-[#EEF0FF] px-4 lg:py-16 z-120"
          >
            <div ref={aboutSectionSvgRef}>
              <div className="relative left-[2%] lg:left-[4%] scale-[0.32] lg:scale-[0.82] xl:scale-[0.82] w-full top-[-30px] lg:top-[100px]">
                <div
                  ref={aboutSectionSvgTextBoxRef}
                  className="flex items-center justify-start"
                >
                  <div className="flex relative left-[-12%] overflow-hidden w-[370px] ">
                    <img src={"/title/1.svg"} />
                    <img src={"/title/2.svg"} />
                    <img src={"/title/3.svg"} />
                  </div>
                  <div className="flex flex relative left-[-7.5%] overflow-hidden w-[370px]">
                    <img src={"/title/4.svg"} />
                    <img src={"/title/5.svg"} />
                    <img src={"/title/6.svg"} />
                  </div>
                </div>
                <div
                  ref={aboutSectionSvgTextBoxRef2}
                  className="flex items-center justify-center mt-[-60px]  gap-[5px]"
                >
                  <div className="flex relative left-[-30px] overflow-hidden  w-[230px]">
                    <img src={"/title/7.svg"} />
                    <img src={"/title/8.svg"} />
                    <img src={"/title/9.svg"} />
                  </div>
                  <div className="flex mt-[-20px] overflow-hidden w-[490px]">
                    <img src={"/title/10.svg"} />
                    <img src={"/title/11.svg"} />
                    <img src={"/title/12.svg"} />
                  </div>
                  <div className="flex relative top-[-70px] overflow-hidden w-[310px]">
                    <img src={"/title/13.svg"} />
                  </div>
                </div>
              </div>

              <div className="mb-[20px] mt-[-15%] lg:mt-[60px] mb-[20px]  ">
                <p className="text-[#6210FF] text-[18px] lg:text-4xl font-[500] text-center mt-[0px] mb-[20px]  leading-[75%] tracking-[2%] relative overflow-hidden">
                  <span
                    ref={aboutSectionTitleRefOne}
                    className={"relative block"}
                  >
                    ‘Vua’ is the Voice that will lead the dialogue{" "}
                  </span>
                </p>
                <p className="text-[#6210FF] text-[18px] lg:text-4xl font-[500] text-center mt-[0px]  leading-[75%] tracking-[2%] relative overflow-hidden">
                  <span
                    ref={aboutSectionTitleRefTwo}
                    className={"relative block"}
                  >
                    for a future-forward world of Marketing.
                  </span>
                </p>
              </div>
            </div>
          </section>
        </section>

        <section
          ref={antronutSectionRef}
          className="relative min-h-screen w-full bg-[url('/Whoarewe.png')] bg-cover bg-center text-white px-6 py-16 lg:py-28"
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
              <img
                src="/Layer_1.png"
                alt="Decorative Arc"
                className="absolute top-1/2 left-1/2 transform -translate-x-[38%] -translate-y-[60%] w-[1200px] z-0 "
              />

              <img
                ref={antronutImageElementRef}
                src="/astro.png"
                alt="Astronaut"
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
                Who Are We?
              </h2>
              <h2 className="text-[50px] lg:text-[67px] font-thin mb-[30px] outfit-light leading-[58px] lg:hidden ">
                Who <br /> Are We?
              </h2>
              <p className="text-base font-[400] text-lg lg:text-[19.69px] leading-relaxed mb-4 lg:font-[300]">
                We are a future-focused Marketing agency that aims to help
                brands leverage the latest in marketing creativity and
                technology to achieve their Growth KPIs.
                <span className="font-[500] lg:font-[500] text-white">
                  {" "}
                  Our 360-degree service portfolio of creative, digital and
                  Mar-Tech solutions{" "}
                </span>
                empowers brands to lead, not follow, in a world shaped by
                innovation.
              </p>
              <p className="text-base font-[400] text-lg lg:text-[19.69px] leading-relaxed mb-4 lg:font-[300]">
                VUA is more than a brand-it’s a movement for those who seek to
                lead the next era of change.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={foundationSectionRef}
          className="relative w-screen h-screen text-zinc-900 bg-[#6310FF] overflow-hidden"
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
                <h2 className="text-[50px] text-white font-[400] m-0 leading-[45px]        max-[350px]:text-[40px] lg:text-6xl">
                  Our
                </h2>
                <h2 className="text-[50px] text-white font-[400] m-0 leading-[45px]        max-[350px]:text-[40px] lg:text-6xl">
                  Foundation
                </h2>
              </div>
            </div>
          </div>

          <div
            className="absolute right-0 bottom-[40px] w-full h-screen z-[2] flex flex-col items-start justify-end pl-8 gap-7
            max-[350px]:gap-[14px]
             lg:w-1/2  lg:gap-[5.5%] lg:bottom-0 lg:justify-center
            "
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div ref={foundationContent1Ref}>
                <h2 className="text-[35px] text-white font-medium m-0  max-[350px]:text-[27px]  lg:text-[3rem]">
                  Creativity
                </h2>
                <p className="text-base text-white font-medium m-0">
                  Creativity that inspires
                </p>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div ref={foundationContent2Ref}>
                <h2 className="text-[35px] text-white font-medium m-0 max-[350px]:text-[27px]  lg:text-[3rem]">
                  Innovation
                </h2>
                <p className="text-base text-white font-medium m-0">
                  Technology that keeps You ahead
                </p>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div ref={foundationContent3Ref}>
                <h2 className="text-[35px] text-white font-medium m-0 max-[350px]:text-[27px]  lg:text-[3rem]">
                  Strategic Thinking
                </h2>
                <p className="text-base text-white font-medium m-0">
                  Strategy that always makes you win
                </p>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div ref={foundationContent4Ref}>
                <h2 className="text-[35px] text-white font-medium m-0 max-[350px]:text-[27px]  lg:text-[3rem]">
                  Customer Centricity
                </h2>
                <p className="text-base text-white font-medium m-0">
                  Everything is about “You”
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={directorContainerRef}
          className="relative w-screen h-screen text-zinc-900 bg-[#EEF0FF] overflow-hidden"
        >
          <h2
            className="text-[94.5px] font-[500] text-center text-[#6210FF] mb-12"
            style={{
              position: "relative",
              // Remove this line: transform: "translateX(-50%)",
              left: "50%",
              width: "100%",
              top: "7%",
              zIndex: 10,
              willChange: "transform",
              transform: "translateX(-50%)",
            }}
          >
            {/* Director */}
          </h2>

          <section
            className="bg-[transparent] py-[0] px-6 md:px-20"
            ref={directionCarousalOne}
            style={{
              position: "absolute",
              // transform: "translateX(-50%)",
              left: "50%",
              width: "100%",
              height: "100vh",
              top: "0%",
              zIndex: 1,
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: "5%",
                paddingTop: 30,
              }}
            >
              <h2 className="text-[54.5px] lg:text-[94.5px] font-[500] text-center text-[#6210FF] mb-1">
                Director
              </h2>
              <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-[20px] lg:gap-12 items-start">
                <div
                  ref={directorOneImageRef}
                  className="md:col-span-5 flex justify-center"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="relative h-[235px] w-[235px] lg:h-[375px]  lg:w-[70%] lg:h-[50%] overflow-hidden">
                    <Image
                      src="/Vishal-Sharma.png"
                      alt="Vishal Sharma"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div>
                    <div className="overflow-hidden height-[fit-content] ">
                      <h2
                        ref={directorOneNameRef}
                        className="relative text-[20.5px]  lg:text-[30.5px] font-[500] text-center text-[#6210FF] mb-0 mt-4"
                      >
                        Vishal Sharma
                      </h2>
                    </div>
                    <div className="overflow-hidden height-[fit-content] ">
                      <p
                        ref={directorOneSubNameRef}
                        className="relative text-[16.5px] lg:text-[25.5px] font-[500] text-center text-[#BE2FF4] mt-[-5px]"
                      >
                        {/* co-Founder */}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="md:col-span-7 text-[#6210FF] leading-relaxed tracking-[0.08em] space-y-4 relative lg:h-[100%] "
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  <div ref={directorOneTextRef}>
                    <p className="text-[14px] lg:text-[17px]">
                      A seasoned leader with over <strong>25 Years</strong> of
                      diverse industry experience spanning{" "}
                      <strong>
                        {" "}
                        Media, Telecom, Real Estate, Infrastructure, and
                        Utilities,
                      </strong>{" "}
                      Vishal is recognized for his ability to develop and
                      implement winning, comprehensive{" "}
                      <strong> Marketing Communication</strong> and{" "}
                      <strong>Branding Strategies </strong> in complex
                      environments. His expertise as a brand marketing leader
                      encompasses cross-functional knowledge of both{" "}
                      <strong> Domestic and Global Markets.</strong>
                    </p>
                    <br />
                    <p className="text-[14px] lg:text-[17px]">
                      Prior to his entrepreneurial ventures, Vishal held{" "}
                      <strong> Senior Managerial Positions </strong> leading{" "}
                      <strong> Branding & Communications </strong> at
                      prestigious organizations including{" "}
                      <strong>
                        {" "}
                        Bharti Airtel, Vodafone, Reliance, Etisalat, Essel
                        Group, Anarock, GreenCell Mobility, and PropertyPistol.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="bg-[transparent] py-[0] px-6 md:px-20"
            ref={directionCarousalTwo}
            style={{
              position: "absolute",
              // transform: "translateX(-50%)",
              left: "50%",
              width: "100%",
              height: "100vh",
              top: "0%",
              zIndex: 1,
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: "5%",
                paddingTop: 30,
              }}
            >
              <h2 className="text-[54.5px] lg:text-[94.5px] font-[500] text-center text-[#6210FF] mb-1">
                Director
              </h2>
              <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-[20px]  lg:gap-12 items-start">
                <div
                  ref={directorTwoImageRef}
                  className="md:col-span-5 flex justify-center "
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="relative h-[235px] w-[235px] lg:h-[375px]  lg:w-[70%] lg:h-[50%] overflow-hidden">
                    <Image
                      src="/Shivendra-Singh.png"
                      alt="Shivendra Singh"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div>
                    <div className="overflow-hidden height-[fit-content] ">
                      <h2
                        ref={directorTwoNameRef}
                        className="relative text-[20.5px] lg:text-[30.5px] font-[500] text-center text-[#6210FF] mb-0 mt-4"
                      >
                        Shivendra Singh
                      </h2>
                    </div>
                    <div className="overflow-hidden height-[fit-content] ">
                      <p
                        ref={directorTwoSubNameRef}
                        className="relative text-[16.5px] lg:text-[25.5px] font-[500] text-center text-[#BE2FF4] mt-[-5px]"
                      >
                        {/* co-Founder */}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="md:col-span-7 text-[#6210FF] leading-relaxed tracking-[0.08em] space-y-4 relative overflow-hidden lg:h-[100%] "
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  <div ref={directorTwoTextRef}>
                    <p className="text-[14px] lg:text-[17px]">
                      A seasoned business leader with over{" "}
                      <strong>17 Years</strong> of experience in the{" "}
                      <strong>Real Estate Industry </strong> across India and
                      international markets, including the GCC, Europe, and
                      North America. He has held key positions in prestigious
                      organizations such as{" "}
                      <strong>
                        AllCheckDeals (InfoEdge), Proptiger.com, JLL, ANAROCK,
                        and PropertyPistol.
                      </strong>{" "}
                      He has been instrumental in successfully managing both
                      Indian and international portfolios, showcasing a proven
                      ability to navigate diverse market dynamics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section
          className="relative bg-black text-white pt-10 px-4 sm:px-6 md:px-8 text-center h-[100vh] w-[100vw] "
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            overflowX: "hidden",
            width: "100vw",
            height:"50vw",
          }}
        >
          <h2 className="text-[54.5px] lg:text-[94.5px] font-[500] bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] bg-clip-text text-transparent block mb-[90px]">
            Our Team
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
            {getTeamSlice(team).map((member, index) => {
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
                    <img
                      className="team-image w-full h-full object-cover"
                      src={member.image}
                      alt={member.name}
                    />
                  </div>

                  <div className="text-center mt-3">
                    <p className="team-name text-lg sm:text-xl md:text-lg lg:text-xl xl:text-2xl font-semibold leading-tight">
                      {member.name.split(" ")[0]}
                      <br />
                      {member.name.split(" ")[1]}
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
