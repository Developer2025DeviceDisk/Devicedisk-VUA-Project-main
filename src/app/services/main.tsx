"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Observer from "gsap/Observer";
import SplitText from "gsap/SplitText";
import Lenis from "@studio-freight/lenis";
import * as THREE from "three";
import { SceneCloud } from "./cloud/Scene";
import { SceneJigJaw } from "./jigjaw/scene";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SceneSpring } from "./SpringModal/scene";
import TechnologicalSolutions from "../components/TechnologicalSolutions";
import AgentVisionDesktop from "../components/AgentVisionDesktop";
import { VRScene } from "./vr";
import SVGComponent from "../components/Agent";

gsap.registerPlugin(ScrollTrigger, SplitText, Observer);

// @ts-ignore
const mapProgress = (progress, completeAt = 0.1, from = 0.8, to = -0.5) => {
  if (progress > completeAt) return to;
  const t = progress / completeAt; // Remap [0, completeAt] to [0, 1]
  return from + (to - from) * t;
};

interface ServicesProps {
  content?: any;
}

export default function Services({ content }: ServicesProps) {
  const headerRef = useRef<any>(null);
  const headerTitleRef = useRef<any>(null);
  const headerSubTitleRef = useRef<any>(null);

  const groupContainerRef = useRef<any>(null);
  const groupImageRef = useRef<any>(null);
  const groupTitleRef = useRef<any>(null);
  const [envRotation, setEnvRotation] = useState([14, 0, 0]);
  const canvasContainerRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const modalRef = useRef<any>(null);

  const isDesktop = useMediaQuery("min-width", 920);
  const [loaderFinished, setLoaderFinished] = useState(false);

  useEffect(() => {
    if (isDesktop === undefined) return;

    const timer = setTimeout(() => setLoaderFinished(true), 150);
    return () => clearTimeout(timer);
  }, [isDesktop]);

  // --------------------------- Jagjaw ---------------------------
  const jagjawContainer = useRef(null);
  const jagjawgroupRef = useRef<any>(null);
  const jagjawOne = useRef<any>(null);
  const jagjawTwo = useRef<any>(null);
  const jagjawThree = useRef<any>(null);
  const jagjawFour = useRef<any>(null);

  const springContainer = useRef(null);
  const springgroupRef = useRef<any>(null);
  const springOne = useRef<any>(null);
  const springTwo = useRef<any>(null);
  const springThree = useRef<any>(null);
  const springFour = useRef<any>(null);

  const cubeContainer = useRef(null);
  const cubeOne = useRef<any>(null);
  const cubeTwo = useRef<any>(null);

  // ----------- agent vua -----------
  const svgRef = useRef<SVGSVGElement>(null);

  // -------- agent vision ---------
  const agentVisionRef = useRef(null);
  const videoLeftOne = useRef<any>(null);
  const videoLeftTwo = useRef<any>(null);
  const videoLeftThree = useRef<any>(null);

  // -------- mobile agent vision ---------
  const agentVisionMobileOneContainer = useRef<any>(null);
  const agentVisionMobileVideoOne = useRef<any>(null);
  const agentVisionMobileVideoTwo = useRef<any>(null);
  const agentVisionMobileTwoContainer = useRef<any>(null);
  const agentVisionMobileVideoThree = useRef<any>(null);

  // ---------- vr -----------
  const vrContainer = useRef(null);
  const vrContainerBackdrop = useRef(null);
  const vrVideoContainerRef = useRef(null);
  const vrSectionContent = useRef<any>(null);
  const vrModalContainer = useRef(null);

  const vrGroupRef = useRef<any>(null);
  const vrOneRef = useRef<any>(null);

  useEffect(() => {
    if (isDesktop === undefined) return;

    let lenis: any = null;
    lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // ---------- About Section Animation ----------
    ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top bottom",
      end: `+=${window.innerHeight * 1.2}px`,
      scrub: false,
      onUpdate: ({ progress }) => {
        gsap.to([headerTitleRef.current, headerSubTitleRef.current], {
          yPercent: -progress * 20, // Start below viewport
        });
      },
    });

    // ------------------- JagJaw Animation -------------------
    ScrollTrigger.create({
      trigger: jagjawContainer.current,
      start: "top top",
      end: `+=${window.innerHeight * 2}px`,
      pin: true,
      pinSpacing: true,
      scrub: false,
      onUpdate: ({ progress }) => {
        if (
          jagjawOne.current &&
          jagjawThree.current &&
          jagjawTwo.current &&
          jagjawFour.current &&
          jagjawgroupRef.current
        ) {
          const jagjawOneRX = mapProgress(progress, 0.8, 180, 0);

          const jagjawOneX = mapProgress(progress, 0.8, -0.95 * 1.5, 0);
          const jagjawOneY = mapProgress(progress, 0.8, -2.05 * 1.5, 0);
          const jagjawOneZ = mapProgress(progress, 0.8, -1.1 * 1.5, 0);

          gsap.to(jagjawOne.current.position, {
            x: jagjawOneX,
            y: jagjawOneY,
            z: jagjawOneZ,
            duration: 0,
            overwrite: true,
            ease: "power2.out",
          });

          gsap.to(jagjawOne.current.rotation, {
            x: THREE.MathUtils.degToRad(jagjawOneRX),
            duration: 0,
            overwrite: true,
            ease: "power2.out",
          });

          const jagjawRTwoX = mapProgress(progress, 0.75, 185, 0);

          const jagjawTwoX = mapProgress(progress, 0.75, 0.1 * 1.5, 0);
          const jagjawTwoY = mapProgress(progress, 0.75, -2.25 * 1.5, 0);
          const jagjawTwoZ = mapProgress(progress, 0.75, -0.65 * 1.5, 0);

          gsap.to(jagjawTwo.current.position, {
            x: jagjawTwoX,
            y: jagjawTwoY,
            z: jagjawTwoZ,
            duration: 0,
            overwrite: true,
            ease: "power2.out",
          });

          gsap.to(jagjawTwo.current.rotation, {
            x: THREE.MathUtils.degToRad(jagjawRTwoX),
            duration: 0,
            overwrite: true,
            ease: "power2.out",
          });

          const jagjawRThreeX = mapProgress(progress, 0.75, -180, 0);

          const jagjawThreeX = mapProgress(progress, 0.75, 0.1 * 1.5, 0);
          const jagjawThreeY = mapProgress(progress, 0.75, 2.15 * 1.5, 0);
          const jagjawThreeZ = mapProgress(progress, 0.75, 3.1 * 1.5, 0);

          gsap.to(jagjawThree.current.position, {
            x: jagjawThreeX,
            y: jagjawThreeY,
            z: jagjawThreeZ,
            duration: 0,
            overwrite: true,
            ease: "power2.out",
          });

          gsap.to(jagjawThree.current.rotation, {
            x: THREE.MathUtils.degToRad(jagjawRThreeX),
            duration: 0,
            overwrite: true,
            ease: "power2.out",
          });

          const jagjawRFourX = mapProgress(progress, 0.8, 115, 0);
          const jagjawRFourZ = mapProgress(progress, 0.8, 90, 0);

          const jagjawFourX = mapProgress(progress, 0.8, 0 * 1.5, 0);
          const jagjawFourY = mapProgress(progress, 0.8, -2.95 * 1.5, 0);
          const jagjawFourZ = mapProgress(progress, 0.8, 0.0 * 1.5, 0.0);

          gsap.to(jagjawFour.current.position, {
            x: jagjawFourX,
            y: jagjawFourY,
            z: jagjawFourZ,
            duration: 0,
            overwrite: true,
            ease: "power2.out",
            // delay: 0.3,
          });

          gsap.to(jagjawFour.current.rotation, {
            x: THREE.MathUtils.degToRad(jagjawRFourX),
            z: THREE.MathUtils.degToRad(jagjawRFourZ),
            duration: 0,
            overwrite: true,
            ease: "power2.out",
            // delay: 0.3,
          });
        }
      },
    });

    // ------------------- Spring ScrollTrigger Animation -------------------
    ScrollTrigger.create({
      trigger: springContainer.current,
      start: "top top",
      end: `+=${window.innerHeight * 2}px`,
      pin: true,
      pinSpacing: true,
      scrub: false,
      onUpdate: ({ progress }) => {
        if (springOne.current && springTwo.current) {
          //  ------ Stage 1 ------

          const positionTopX = mapProgress(progress, 0.3, -3.6, -2.0);
          const positionTopY = mapProgress(progress, 0.3, 0, 0);
          const positionTopZ = mapProgress(progress, 0.3, -3.6, -2.5);

          const positionBottomX = mapProgress(progress, 0.3, 2.55, 2.15);
          const positionBottomY = mapProgress(progress, 0.3, 0, 0.0);
          const positionBottomZ = mapProgress(progress, 0.3, 2.55, 0.65);

          gsap.to(springOne.current.position, {
            x: positionTopX,
            y: positionTopY,
            z: positionTopZ,
            duration: 0,
            overwrite: true,
            ease: "power2.out",
          });

          gsap.to(springTwo.current.position, {
            x: positionBottomX,
            y: positionBottomY,
            z: positionBottomZ,
            duration: 0,
            overwrite: true,
            ease: "power2.out",
          });

          //  ------ Stage 2 ------
          if (progress > 0.3) {
            const positionTopX = mapProgress(progress - 0.3, 0.5, -2.0, -0.3);
            const positionTopY = mapProgress(progress - 0.3, 0.5, 0, 0);
            const positionTopZ = mapProgress(progress - 0.3, 0.5, -2.5, -0.6);
            const positionTopRotationY = mapProgress(
              progress - 0.3,
              0.5,
              0,
              180
            );

            const positionBottomX = mapProgress(progress - 0.3, 0.5, 2.15, 0.3);
            const positionBottomY = mapProgress(progress - 0.3, 0.5, 0.0, 0);
            const positionBottomZ = mapProgress(progress - 0.3, 0.5, 0.65, 0);
            const positionBottomRotationY = mapProgress(
              progress - 0.3,
              0.5,
              180,
              0
            );

            gsap.to(springOne.current.position, {
              x: positionTopX,
              y: positionTopY,
              z: positionTopZ,
              duration: 0,
              overwrite: true,
              ease: "power2.out",
            });
            gsap.to(springOne.current.rotation, {
              x: THREE.MathUtils.degToRad(positionTopRotationY),
              duration: 0,
              overwrite: true,
              ease: "power2.out",
            });

            gsap.to(springTwo.current.position, {
              x: positionBottomX,
              y: positionBottomY,
              z: positionBottomZ,
              duration: 0,
              overwrite: true,
              ease: "power2.out",
            });
            gsap.to(springTwo.current.rotation, {
              x: THREE.MathUtils.degToRad(positionBottomRotationY),
              duration: 0,
              overwrite: true,
              ease: "power2.out",
            });
          }
        }
      },
    });

    // ------------------- Cube ScrollTrigger Animation -------------------

    if (cubeOne.current) {
      gsap.set(cubeOne.current, {
        scale: 2.5 * 1.5,
        xPercent: 100 * 3,
      });
    }

    if (cubeTwo.current) {
      gsap.set(cubeTwo.current, {
        scale: 0.4,
        xPercent: -100,
      });
    }

    ScrollTrigger.create({
      trigger: cubeContainer.current,
      start: "top top",
      end: `+=${window.innerHeight * 1.5}px`,
      pin: true,
      pinSpacing: true,
      scrub: false,
      onUpdate: ({ progress }) => {
        if (!cubeOne.current || !cubeTwo.current) return;

        const scaleOneProgress = mapProgress(progress, 0.7, 2.5 * 1.5, 2.5);
        const scaleOneXPercentProgress = mapProgress(progress, 0.7, 100 * 3, 0);

        const scaleTwoProgress = mapProgress(
          progress,
          0.7,
          0.4,
          isDesktop ? 1 : 1.5
        );
        const scaleTwoXPercentProgress = mapProgress(progress, 0.7, -100, 0);

        gsap.to(cubeOne.current, {
          scale: scaleOneProgress,
          xPercent: scaleOneXPercentProgress,
        });

        gsap.to(cubeTwo.current, {
          scale: scaleTwoProgress,
          xPercent: scaleTwoXPercentProgress,
        });
      },
    });

    // ------------------- Cloud ScrollTrigger Animation -------------------
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 2}px`,
      pin: true,
      pinSpacing: true,
      scrub: false,
      onUpdate: ({ progress }) => {
        if (modalRef.current) {
          const animatedValueRotationX = mapProgress(progress, 0.6, 348, 380);
          const animatedValueRotationY = mapProgress(progress, 0.6, 100, 20);
          const animatedValueRotationZ = mapProgress(progress, 0.6, 360, 340);

          const positionY = mapProgress(progress, 0.6, -4, -0.6);
          const positionZ = mapProgress(progress, 0.6, 2.0, 0);
          const positionX = mapProgress(progress, 0.6, 0.2, -0.6);

          const scaleProgress = mapProgress(progress, 0.6, 1.56, 1.48) * 0.08;

          if (modalRef.current) {
            gsap.to(modalRef.current.rotation, {
              x: THREE.MathUtils.degToRad(animatedValueRotationX),
              y: THREE.MathUtils.degToRad(animatedValueRotationY),
              z: THREE.MathUtils.degToRad(animatedValueRotationZ),

              duration: 0,
              overwrite: true,
              ease: "power2.out",
            });

            gsap.to(modalRef.current.position, {
              y: positionY,
              z: positionZ,
              x: positionX,
              duration: 0,
              overwrite: true,
              ease: "power2.out",
            });

            gsap.to(modalRef.current.scale, {
              x: scaleProgress,
              y: scaleProgress,
              z: scaleProgress,
              duration: 0,
              overwrite: true,
              ease: "power2.out",
            });
          }

          if (progress > 0.6) {
            const scaleProgress =
              mapProgress(progress - 0.6, 0.3, 1.48, 0.61) * 0.08;

            const rotationY = mapProgress(progress - 0.6, 0.3, 20, 6);
            const rotationX = mapProgress(progress - 0.6, 0.3, 380, 438);
            const rotationZ = mapProgress(progress - 0.6, 0.3, 340, 358); // 171

            const positionX = mapProgress(progress - 0.6, 0.3, -0.6, -0.2);
            const positionY = mapProgress(progress - 0.6, 0.3, -0.6, -0.4);
            const positionZ = mapProgress(progress - 0.6, 0.3, 0, 0);
            0;
            gsap.to(modalRef.current.scale, {
              x: scaleProgress,
              y: scaleProgress,
              z: scaleProgress,
              duration: 0,
              overwrite: true,
              ease: "power2.out",
            });
            gsap.to(modalRef.current.position, {
              y: positionY,
              x: positionX,
              z: positionZ,
              duration: 0,
              overwrite: true,
              ease: "power2.out",
            });

            gsap.to(modalRef.current.rotation, {
              y: THREE.MathUtils.degToRad(rotationY),
              x: THREE.MathUtils.degToRad(rotationX),
              z: THREE.MathUtils.degToRad(rotationZ),
              duration: 0,
              overwrite: true,
              ease: "power2.out",
            });
          }
        }
      },
    });

    // --------------------- Agent vua ---------------------------------
    if (!svgRef.current) return;

    // Get all line elements
    const boxes = svgRef.current.querySelectorAll("line");

    // Set initial state - all lines start with x2=60 (same as x1)
    gsap.set(boxes, { attr: { x2: 75 } });

    function playWave() {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0, ease: "none" });

      boxes.forEach((box, i) => {
        gsap.fromTo(
          box,
          { attr: { x1: 60 } },
          {
            attr: { x1: 57 },
            duration: 0.4,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.1,
            repeatDelay: 0,
          }
        );
      });
      boxes.forEach((box, i) => {
        tl.to(
          box,
          {
            // height: 95,
            attr: {
              x2: (index) => {
                return 90;
              },
            },
            duration: 0.3,
            ease: "power1.inOut",
          },
          i * 0.1
        ); // forward wave

        tl.to(
          box,
          {
            attr: {
              x2: (index) => {
                return 75;
              },
            },
            duration: 0.3,
            ease: "power1.inOut",
          },
          i * 0.1 + 0.3
        );
      });

      return tl;
    }

    playWave();
    // ------------------- Agent vision Section ScrollTrigger Animation -------------------

    if (videoLeftOne.current) {
      gsap.set(videoLeftOne.current.querySelectorAll("video")[1], {
        yPercent: 0,
        opacity: 0,
      });
    }

    if (videoLeftTwo.current) {
      gsap.set(videoLeftTwo.current.querySelectorAll("video")[1], {
        yPercent: 0,
        opacity: 0,
      });
    }

    if (videoLeftThree.current) {
      gsap.set(videoLeftThree.current.querySelectorAll("video")[1], {
        yPercent: 0,
        opacity: 0,
      });
    }

    if (agentVisionRef.current) {
      ScrollTrigger.create({
        trigger: agentVisionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 2}px`,
        pin: true,
        pinSpacing: true,
        scrub: false,
        onUpdate: ({ progress }) => {
          if (
            videoLeftOne.current &&
            videoLeftTwo.current &&
            videoLeftThree.current
          ) {
            const itemProgress = mapProgress(progress - 0.1, 0.5, 0, 1);

            if (progress > 0.1) {
              gsap.to(
                [
                  videoLeftOne.current.querySelectorAll("video")[1],
                  videoLeftTwo.current.querySelectorAll("video")[1],
                  videoLeftThree.current.querySelectorAll("video")[1],
                ],
                {
                  opacity: itemProgress,
                }
              );

              gsap.to(
                [
                  videoLeftOne.current.querySelectorAll("video")[0],
                  videoLeftTwo.current.querySelectorAll("video")[0],
                  videoLeftThree.current.querySelectorAll("video")[0],
                ],
                {
                  opacity: 1 - itemProgress,
                }
              );
            }
          }
        },
      });
    }
    // -------------------------------------- inside --------------------------------------
    ScrollTrigger.create({
      trigger: groupContainerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 2}px`,
      pin: true,
      pinSpacing: true,
      scrub: false,
      onUpdate: ({ progress }) => {
        const headerProgress = Math.max(0, progress / 0.7);
        gsap.to(groupTitleRef.current, {
          xPercent: -100 * headerProgress,
        });
      },
    });

    // ------ Mobile Agent Vision ScrollTrigger Animations ------
    // Initialize GSAP settings for mobile videos
    if (agentVisionMobileVideoOne.current) {
      gsap.set(agentVisionMobileVideoOne.current.querySelectorAll("video")[1], {
        opacity: 0,
      });
    }
    if (agentVisionMobileVideoTwo.current) {
      gsap.set(agentVisionMobileVideoTwo.current.querySelectorAll("video")[1], {
        opacity: 0,
      });
    }
    if (agentVisionMobileVideoThree.current) {
      gsap.set(
        agentVisionMobileVideoThree.current.querySelectorAll("video")[1],
        {
          opacity: 0,
        }
      );
    }

    // ScrollTrigger for mobile container one
    if (agentVisionMobileOneContainer.current) {
      ScrollTrigger.create({
        trigger: agentVisionMobileOneContainer.current,
        start: "top top",
        end: `+=${window.innerHeight * 2}px`,
        pin: true,
        pinSpacing: true,
        scrub: false,
        onUpdate: ({ progress }) => {
          if (
            agentVisionMobileVideoOne.current &&
            agentVisionMobileVideoTwo.current
          ) {
            const itemProgress = mapProgress(progress - 0.1, 0.5, 0, 1);

            if (progress > 0.1) {
              gsap.to(
                [
                  agentVisionMobileVideoOne.current.querySelectorAll(
                    "video"
                  )[1],
                  agentVisionMobileVideoTwo.current.querySelectorAll(
                    "video"
                  )[1],
                ],
                {
                  opacity: itemProgress,
                }
              );
              gsap.to(
                [
                  agentVisionMobileVideoOne.current.querySelectorAll(
                    "video"
                  )[0],
                  agentVisionMobileVideoTwo.current.querySelectorAll(
                    "video"
                  )[0],
                ],
                {
                  opacity: 1 - itemProgress,
                }
              );
            }
          }
        },
      });
    }

    // ScrollTrigger for mobile container two
    if (agentVisionMobileTwoContainer.current) {
      ScrollTrigger.create({
        trigger: agentVisionMobileTwoContainer.current,
        start: "top top",
        end: `+=${window.innerHeight * 2}px`,
        pin: true,
        pinSpacing: true,
        scrub: false,
        onUpdate: ({ progress }) => {
          if (agentVisionMobileVideoThree.current) {
            const itemProgress = mapProgress(progress - 0.1, 0.5, 0, 1);

            if (progress > 0.1) {
              gsap.to(
                [
                  agentVisionMobileVideoThree.current.querySelectorAll(
                    "video"
                  )[1],
                ],
                {
                  opacity: itemProgress,
                }
              );
              gsap.to(
                [
                  agentVisionMobileVideoThree.current.querySelectorAll(
                    "video"
                  )[0],
                ],
                {
                  opacity: 1 - itemProgress,
                }
              );
            }
          }
        },
      });
    }

    // ------------------- Vr Section ScrollTrigger Animation -------------------

    if (vrVideoContainerRef.current) {
      gsap.set(vrVideoContainerRef.current, {
        opacity: 0,
        scale: 0.7,
      });
    }

    if (vrContainerBackdrop.current) {
      gsap.set(vrContainerBackdrop.current, {
        opacity: 0,
      });
    }

    ScrollTrigger.create({
      trigger: vrContainer.current,
      start: "top top",
      end: `+=${window.innerHeight * 2}px`,
      pin: true,
      pinSpacing: true,
      scrub: false,
      onUpdate: ({ progress }) => {
        if (
          vrOneRef.current &&
          vrSectionContent.current &&
          vrVideoContainerRef.current &&
          vrModalContainer.current &&
          vrContainerBackdrop.current
        ) {
          const scaleProgress = mapProgress(progress, 0.5, 0.11, 0.58);
          const rotationYProgress = mapProgress(progress, 0.5, -134, -224);

          const positionXProgress = mapProgress(progress, 0.5, 0, -0.15);
          const positionYProgress = mapProgress(progress, 0.5, -0.15, -0.75);
          const positionZProgress = mapProgress(progress, 0.5, -0.3, -0.15);

          const targetGroup = vrOneRef.current.getObjectByName("Object_91");

          if (progress > 0.5) {
            gsap.to(vrModalContainer.current, {
              opacity: 0.3,
              ease: "power2.out",
              duration: 0.5,
            });

            if (targetGroup && targetGroup.isGroup) {
              targetGroup.traverse((child: any) => {
                if (child.isMesh && child.material) {
                  if (Array.isArray(child.material)) {
                    child.material.forEach((mat: any) => {
                      mat.transparent = true;
                      gsap.to(mat, {
                        opacity: 0,
                        duration: 0,
                        ease: "power2.inOut",
                      });
                    });
                  } else {
                    child.material.transparent = true;
                    gsap.to(child.material, {
                      opacity: 0,
                      duration: 0,
                      ease: "power2.inOut",
                    });
                  }
                }
              });
            }

            gsap.to(vrVideoContainerRef.current, {
              opacity: 1,
              scale: 0.8,
              ease: "power2.out",
              duration: 0.5,
            });
            gsap.to(vrContainerBackdrop.current, {
              opacity: 1,
              ease: "power2.out",
              duration: 0.5,
            });
          }

          if (progress < 0.5) {
            gsap.to(vrVideoContainerRef.current, {
              opacity: 0,
              scale: 0.7,
              ease: "power2.out",
              duration: 0.5,
            });

            if (targetGroup && targetGroup.isGroup) {
              targetGroup.traverse((child: any) => {
                if (child.isMesh && child.material) {
                  if (Array.isArray(child.material)) {
                    child.material.forEach((mat: any) => {
                      mat.transparent = true;
                      gsap.to(mat, {
                        opacity: 1,
                        duration: 0,
                        ease: "power2.inOut",
                      });
                    });
                  } else {
                    child.material.transparent = true;
                    gsap.to(child.material, {
                      opacity: 1,
                      duration: 0,
                      ease: "power2.inOut",
                    });
                  }
                }
              });
            }
            gsap.to(vrModalContainer.current, {
              opacity: 1,
              ease: "power2.out",
              duration: 0.5,
            });

            gsap.to(vrContainerBackdrop.current, {
              opacity: 0,
              ease: "power2.out",
              duration: 0.5,
            });
          }

          gsap.to(vrOneRef.current.scale, {
            x: scaleProgress,
            y: scaleProgress,
            z: scaleProgress,
            duration: 0,
            overwrite: true,
            ease: "power2.out",
          });

          gsap.to(vrOneRef.current.position, {
            x: positionXProgress,
            y: positionYProgress,
            z: positionZProgress,
            duration: 0,
            overwrite: true,
            ease: "power2.out",
          });
          gsap.to(vrOneRef.current.rotation, {
            y: THREE.MathUtils.degToRad(rotationYProgress),
            duration: 0,
            overwrite: true,
            ease: "power2.out",
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [isDesktop]);

  return (
    <section>
      <section className="z-10 bg-[black]">
        <section className="max-sm:px-[22px] relative flex flex-col items-center justify-center text-center overflow-hidden bg-[#6210ff] ">
          <div
            ref={headerRef}
            className="h-[100vh] flex items-center justify-center"
          >
            <style>
              {`

              
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-40px); }
          }
          .floating {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes orbit-border-vector6 {
            0%   { top: -75vh; left: -25vw; transform: rotate(0deg); }
            25%  { top: -75vh; left: 25vw; transform: rotate(90deg); }
            50%  { top: 25vh; left: 25vw; transform: rotate(180deg); }
            75%  { top: 25vh; left: -25vw; transform: rotate(270deg); }
            100% { top: -75vh; left: -25vw; transform: rotate(360deg); }
          }
          @keyframes orbit-border-vector7 {
            0%   { top: -25vh; left: -35vw; transform: rotate(180deg); }
            25%  { top: 25vh; left: -10vw; transform: rotate(270deg); }
            50%  { top: -25vh; left: 25vw; transform: rotate(0deg); }
            75%  { top: -75vh; left: -10vw; transform: rotate(90deg); }
            100% { top: -25vh; left: -35vw; transform: rotate(180deg); }
          }
          .border-orbit {
            position: fixed;
            width: 300vw;
            height: 300vh;
            pointer-events: none;
            z-index: 0;
          }
          .orbit-image-vector6 {
            width: 130%;
            height: 130%;
            position: fixed;
            animation: orbit-border-vector6 15s linear infinite;
          }
          .orbit-image-vector7 {
            width: 150%;
            height: 150%;
            position: fixed;
            animation: orbit-border-vector7 15s linear infinite;
          }

          .orbit-image-vector6, .orbit-image-vector7 {
              @media (max-width: 768px) {
             animation: none; /* Disable animations */
               position: static; /* Reduce complexity */
         }
         }

          @media (min-width: 991px){
                  
                    @keyframes float {
                      0%, 100% { transform: translateY(0); }
                      50% { transform: translateY(-20px); }
                    }
          }
          

          @media (max-width: 768px) {
            .orbit-image-vector6, .orbit-image-vector7 {
            width: 250%;
            height: 250%;
            }
          }
          `}
            </style>

            <div>
              <h1
                ref={headerTitleRef}
                className="text-white petrovsans-book max-sm:text-[45px] md:text-[94px] max-sm:mb-[100px] md:mb-[60px] z-10 max-sm:leading-[55px] md:leading-[122.8px] "
              >
                {content?.headerTitle || "Your 360° Growth Engine"}
              </h1>

              <p
                ref={headerSubTitleRef}
                className="text-white justify-center mx-[10px] max-w-6xl z-10 max-sm:text-[16px] md:text-[19.69px] leading-[1.49] text-justify outfit-light"
                style={{ letterSpacing: "0.08em", lineHeight: "1.49" }}
              >
                {content?.headerDescription ||
                  "We are India-UAE focused Tech-infused brand marketing agency offering an exhaustive services portfolio in Go-To-Market Strategy Development, Branding & Creative Solutions, AI-backed Performance & Social Media Marketing, and MarTech Automation. Founded by industry veterans, we are a passionate team offering scalable marketing solutions with a data-driven approach with presence in Mumbai, Pune and Dubai."}
              </p>
            </div>
          </div>

          <section
            className="relative w-screen h-screen text-zinc-900 bg-[#BE2FF4] overflow-hidden"
            ref={jagjawContainer}
          >
            <div
              style={{
                position: "absolute",
                left: "0%",
                width: "100%",
                height: "100vh",
                bottom: "0%",
                zIndex: 1,
              }}
            >
              <SceneJigJaw
                jagjawgroupRef={jagjawgroupRef}
                jagjawOne={jagjawOne}
                jagjawTwo={jagjawTwo}
                jagjawThree={jagjawThree}
                jagjawFour={jagjawFour}
              />
            </div>

            <div className="absolute bottom-[0%] left-[0%] w-full h-full px-[40px] flex items-center justify-center">
              {/* Heading */}

              <div className="flex flex-col items-center justify-center">
                <h1 className="text-white text-[45px] leading-[50px] lg:leading-[135px] mb-[10px] petrovsans-semibold md:text-[131.5px] z-10">
                  {content?.strategyTitle || "Strategy"}
                </h1>

                {/* Paragraph */}
                <p
                  className="text-white max-sm:[11.74px] md:text-[31.5px] mb-[60px] z-10 outfit-light"
                  style={{ letterSpacing: "0.08em", lineHeight: "1.49" }}
                >
                  {content?.strategyDescription ||
                    "We translate your aspirations into a precise and actionable blueprint for achieving your goals."}
                </p>

                {/* Mobile: Structured layout, Desktop: Flex wrap */}
                <div className="mb-10 z-10 outfit-light">
                  {/* Mobile Layout */}
                  <div className="block md:hidden">
                    {/* First Row */}
                    <div className="flex justify-center gap-x-[8px] mb-[16px]">
                      {(
                        content?.strategyServices?.slice(0, 3) || [
                          "GTM Strategy",
                          "Brand Strategy",
                          "Brand Voice",
                        ]
                      ).map((tag, idx) => (
                        <button
                          key={idx}
                          className="inline-flex items-center justify-center h-[26px] px-[8px] py-[2px]
                     text-[12px] font-light border border-[#F52FFF] rounded-full
                     text-center whitespace-nowrap leading-none text-white"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* Second Row */}
                    <div className="flex justify-center gap-x-[8px]">
                      {(
                        content?.strategyServices?.slice(3, 6) || [
                          "Campaign Strategy",
                          "PR Strategy",
                          "Social Media Strategy",
                        ]
                      ).map((tag, idx) => (
                        <button
                          key={idx}
                          className="inline-flex items-center justify-center h-[26px] px-[8px] py-[2px]
                     text-[12px] font-light border border-[#F52FFF] rounded-full
                     text-center whitespace-nowrap leading-none text-white"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:block">
                    <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[20px] mb-6">
                      {(
                        content?.strategyServices?.slice(0, 3) || [
                          "GTM Strategy",
                          "Brand Strategy",
                          "Brand Voice",
                        ]
                      ).map((tag, idx) => (
                        <button
                          key={idx}
                          className="inline-flex items-center justify-center h-[36px] px-[12px] py-[6px]
                     text-[20.56px] font-light border border-[#F52FFF] rounded-full
                     text-center whitespace-nowrap leading-none text-white"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[16px]">
                      {(
                        content?.strategyServices?.slice(3, 6) || [
                          "Campaign Strategy",
                          "PR Strategy",
                          "Social Media Strategy",
                        ]
                      ).map((tag, idx) => (
                        <button
                          key={idx}
                          className="inline-flex items-center justify-center h-[36px] px-[12px] py-[6px]
                     text-[20.56px] font-light border border-[#F52FFF] rounded-full
                     text-center whitespace-nowrap leading-none text-white"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explore More Button */}
              </div>
            </div>
          </section>

          {/* ----------------------- Spring Section ---------------------- */}
          <section
            className="relative w-screen h-screen text-zinc-900 bg-[#BE2FF4] overflow-hidden"
            ref={springContainer}
          >
            <div
              style={{
                position: "absolute",
                left: "0%",
                width: "100%",
                height: "100vh",
                bottom: "0%",
                zIndex: 1,
              }}
            >
              <SceneSpring
                jagjawgroupRef={springgroupRef}
                jagjawOne={springOne}
                jagjawTwo={springTwo}
                jagjawThree={springThree}
                jagjawFour={springFour}
              />
            </div>

            <div className="absolute bottom-[0] h-full flex items-center justify-center  left-[0] w-full px-[40px]">
              {/* Heading */}

              <div className="flex flex-col items-center justify-center">
                <h1 className="text-white text-[45px] leading-[50px] mb-[10px] petrovsans-semibold md:text-[126.5px] z-10 lg:leading-[126px] ">
                  {content?.brandingTitle || "Branding & Design"}
                </h1>

                {/* Paragraph */}
                <p
                  className="text-white max-sm:[11.74px] md:text-[31.5px] mt-[10px] lg:mt-[0] mb-[60px] z-10 outfit-light"
                  style={{ letterSpacing: "0.08em", lineHeight: "1.49" }}
                >
                  {content?.brandingDescription ||
                    "We transform your vision into a tangible and impactful brand experience."}
                </p>

                {/* Mobile: Structured layout, Desktop: Flex wrap */}
                <div className="mb-10 z-10 outfit-light">
                  {/* Mobile Layout */}
                  <div className="block md:hidden">
                    {/* First Row */}
                    <div className="flex justify-center gap-x-[8px] mb-[16px]">
                      {(
                        content?.brandingServices?.slice(0, 3) || [
                          "Brand Identity Design",
                          "Website Design",
                          "UI/UX Design",
                        ]
                      ).map((tag, idx) => (
                        <button
                          key={idx}
                          className="inline-flex items-center justify-center h-[26px] px-[8px] py-[2px]
                     text-[12px] font-light border border-[#F52FFF] rounded-full
                     text-center whitespace-nowrap leading-none text-white"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* Second Row */}
                    <div className="flex justify-center gap-x-[8px]">
                      {(
                        content?.brandingServices?.slice(3, 6) || [
                          "Event Branding",
                          "Office Branding",
                          "Print & Digital Creatives",
                        ]
                      ).map((tag, idx) => (
                        <button
                          key={idx}
                          className="inline-flex items-center justify-center h-[26px] px-[8px] py-[2px]
                     text-[12px] font-light border border-[#F52FFF] rounded-full
                     text-center whitespace-nowrap leading-none text-white"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:block">
                    <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[20px] mb-6">
                      {(
                        content?.brandingServices?.slice(0, 3) || [
                          "Brand Identity Design",
                          "Website Design",
                          "UI/UX Design",
                        ]
                      ).map((tag, idx) => (
                        <button
                          key={idx}
                          className="inline-flex items-center justify-center h-[36px] px-[12px] py-[6px]
                     text-[20.56px] font-light border border-[#F52FFF] rounded-full
                     text-center whitespace-nowrap leading-none text-white"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[16px]">
                      {(
                        content?.brandingServices?.slice(3, 6) || [
                          "Event Branding",
                          "Office Branding",
                          "Print & Digital Creatives",
                        ]
                      ).map((tag, idx) => (
                        <button
                          key={idx}
                          className="inline-flex items-center justify-center h-[36px] px-[12px] py-[6px]
                     text-[20.56px] font-light border border-[#F52FFF] rounded-full
                     text-center whitespace-nowrap leading-none text-white"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explore More Button */}
              </div>
            </div>
          </section>

          {/* ----------------------- Cube Section ---------------------- */}
          <section
            className="relative w-screen h-[100lvh] text-zinc-900 bg-[none] overflow-hidden"
            ref={cubeContainer}
          >
            <div className="floating  w-full h-full scale-[0.44] lg:scale-[0.75]">
              <img
                ref={cubeOne}
                src={"/3D/cubeTop.png"}
                className="absolute right-[-20%] top-[-20%] w-[250px] -translate-y-1/2  lg:top-[25%] lg:right-[-7%]"
                width={650} // higher width to control scale animation
                height={650}
                alt={""}
              />
              <img
                ref={cubeTwo}
                className="absolute left-[-50%] top-[135%] w-[250px] -translate-y-1/2 opacity-50 lg:top-[65%] lg:left-[-8%]"
                src={"/3D/cubeTop.png"}
                width={650}
                height={650}
                alt={""}
              />
            </div>

            <div className="absolute flex items-center h-full justify-center bottom-[5%] left-[0%] w-full px-[40px]">
              {/* Heading */}

              <div className="flex flex-col items-center justify-center mt-[50px] lg:mt-[0]">
                <h1 className="text-white text-[45px] leading-[50px] lg:leading-[131.5px] petrovsans-semibold md:text-[131.5px] z-10 m-[0]">
                  {content?.contentTitle || "Content & Production"}
                </h1>

                {/* Paragraph */}
                <p
                  className="text-white max-sm:[11.74px] md:text-[31.5px] mt-2 mb-[60px] z-10 outfit-light"
                  style={{ letterSpacing: "0.08em", lineHeight: "1.49" }}
                >
                  {content?.contentDescription ||
                    "We bring your story to life, crafting impactful content experiences that resonate."}
                </p>

                {/* Mobile: Structured layout, Desktop: Flex wrap */}
                <div className="mb-10 z-10 outfit-light">
                  {/* Mobile Layout */}
                  <div className="block md:hidden">
                    {/* First Row */}
                    <div className="flex justify-center gap-x-[8px] mb-[16px]">
                      {(
                        content?.contentServices?.slice(0, 2) || [
                          "Influencer Marketing",
                          "Blogs / Articles",
                        ]
                      ).map((tag, idx) => (
                        <button
                          key={idx}
                          className="inline-flex items-center justify-center h-[26px] px-[8px] py-[2px]
                     text-[12px] font-light border border-[#F52FFF] rounded-full
                     text-center whitespace-nowrap leading-none text-white"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* Second Row */}
                    <div className="flex justify-center gap-x-[8px] mb-[16px]">
                      {(
                        content?.contentServices?.slice(2, 4) || [
                          "Conceptualization of Content",
                          "Motion Graphics",
                        ]
                      ).map((tag, idx) => (
                        <button
                          key={idx}
                          className="inline-flex items-center justify-center h-[26px] px-[8px] py-[2px]
                     text-[11px] font-light border border-[#F52FFF] rounded-full
                     text-center whitespace-nowrap leading-none text-white"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* Third Row */}
                    <div className="flex justify-center gap-x-[8px]">
                      {(
                        content?.contentServices?.slice(4, 7) || [
                          "Creative Copywriting",
                          "Reel Production",
                          "Video Production",
                        ]
                      ).map((tag, idx) => (
                        <button
                          key={idx}
                          className="inline-flex items-center justify-center h-[26px] px-[6px] py-[2px]
                     text-[10px] font-light border border-[#F52FFF] rounded-full
                     text-center whitespace-nowrap leading-none text-white"
                        >
                          {tag.includes("Video Production") ? tag : tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:block">
                    <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[20px] mb-6">
                      {(
                        content?.contentServices?.slice(0, 4) || [
                          "Influencer Marketing",
                          "Blogs / Articles",
                          "Conceptualization of Content",
                          "Motion Graphics",
                        ]
                      ).map((tag, idx) => (
                        <button
                          key={idx}
                          className="inline-flex items-center justify-center h-[36px] px-[12px] py-[6px]
                     text-[20.56px] font-light border border-[#F52FFF] rounded-full
                     text-center whitespace-nowrap leading-none text-white"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[16px]">
                      {(
                        content?.contentServices?.slice(4, 7) || [
                          "Creative Copywriting",
                          "High Quality Video Production",
                          "Reel Production",
                        ]
                      ).map((tag, idx) => (
                        <button
                          key={idx}
                          className="inline-flex items-center justify-center h-[36px] px-[12px] py-[6px]
                     text-[20.56px] font-light border border-[#F52FFF] rounded-full
                     text-center whitespace-nowrap leading-none text-white"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explore More Button */}
              </div>
            </div>
          </section>

          {/* Group Circle Image */}
        </section>

        {/* ------------------------------------- Cloud Section ------------------------------------- */}

        <section
          className="relative w-screen h-screen text-zinc-900 bg-[#BE2FF4] overflow-hidden"
          ref={containerRef}
        >
          <div
            style={{
              position: "absolute",
              left: "0%",
              width: "100%",
              height: "100vh",
              bottom: "0%",
              zIndex: 1,
            }}
            ref={canvasContainerRef}
          >
            <SceneCloud modalRef={modalRef} envRotation={envRotation} />
          </div>

          <div className="absolute bottom-[0%] h-full flex items-center justify-center left-[0%] w-full px-[40px]">
            {/* Heading */}

            <div className=" flex flex-col items-center justify-center">
              <h1 className="text-white text-[45px] petrovsans-semibold lg:leading-[131.5px] md:text-[131.5px] z-10 hidden lg:block">
                {content?.digitalTitle || "Digital Marketing"}
              </h1>

              <h1 className="text-white text-center leading-[55px] text-[45px] lg:mb-[10px] petrovsans-semibold md:text-[131.5px] z-10 lg:hidden ">
                {content?.digitalTitle
                  ? content.digitalTitle.replace(" ", " \n ")
                  : "Digital \n Marketing"}
              </h1>

              {/* Paragraph */}
              <p
                className="text-white max-sm:[11.74px] md:text-[31.5px] mt-2 mb-[60px] z-10 outfit-light"
                style={{
                  letterSpacing: "0.08em",
                  lineHeight: "1.49",
                  textAlign: "center",
                }}
              >
                {content?.digitalDescription ||
                  "We convert digital footprints into tangible results, connecting you with your audience and driving results."}
              </p>

              {/* Mobile: 1 row, Desktop: Flex wrap */}
              <div className="mb-2 z-10 outfit-light">
                {/* Mobile Layout - Single Row */}
                <div className="block md:hidden">
                  <div className="flex justify-center gap-x-[6px]">
                    {(
                      content?.digitalServices || [
                        "Growth Marketing",
                        "Social Media Management",
                        "SEO Optimization",
                      ]
                    ).map((tag, idx) => (
                      <button
                        key={idx}
                        className="inline-flex items-center justify-center h-[26px] px-[6px] py-[2px]
                   text-[10px] font-light border border-[#F52FFF] rounded-full
                   text-center whitespace-nowrap leading-none text-white"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex flex-wrap justify-center gap-x-[8px] gap-y-[20px]">
                  {(
                    content?.digitalServices || [
                      "Growth Marketing",
                      "Social Media Management Packages",
                      "SEO Optimization & Ranking",
                    ]
                  ).map((tag, idx) => (
                    <button
                      key={idx}
                      className="inline-flex items-center justify-center h-[36px] px-[12px] py-[6px]
                 text-[20.56px] font-light border border-[#F52FFF] rounded-full
                 text-center whitespace-nowrap leading-none text-white"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Explore More Button */}
              {/* <button
                className="mt-4 mb-[200px] px-6 py-2 text-white border border-white rounded-full flex items-center gap-2 z-10 text-[18.36px] outfit-light"
                style={{
                  letterSpacing: "0.08em",
                  lineHeight: "1.49",
                  opacity: 0,
                }}
              >
                EXPLORE MORE
                <Image
                  src={"/vector.png"}
                  alt="Arrow Icon"
                  width={100}
                  height={100}
                  className="w-8 h-3"
                />
              </button> */}
            </div>
          </div>
        </section>

        <section
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className=" relative py-[40px] lg:py-20 lg:px-[0] px-[0] z-[10]"
        >
          {/*---------------- Agent Vua Section ---------------------- */}
          <div>
            <div className="h-[50vh] md:h-[30vh] lg:h-[100vh] flex flex-col items-center justify-center px-4 md:px-0">
              <div className="flex items-center justify-center text-center mb-[20px] md:mb-[10px] lg:mb-[40px]">
                <h1 className=" text-[95px] leading-tight petrovsans-light z-50 ">
                  <span
                    className="hidden lg:block"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "2px #6210FF",
                      textShadow: "0 0 0 #6210FF",
                    }}
                  >
                    {content?.techSolutionsTitle || "Technological Solution"}
                  </span>
                </h1>

                <h1 className=" text-[50px] leading-tight petrovsans-book z-50">
                  <span
                    className="block lg:hidden"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1.5px #6210FF",
                    }}
                  >
                    {content?.techSolutionsTitle
                      ? content.techSolutionsTitle.replace(" ", "\n")
                      : "Technological\nSolution"}
                  </span>
                </h1>
              </div>
              <p
                className="text-[#9259FF] text-[16px] md:text-[19.6px] text-center px-4 md:px-0 mb-4 md:mb-0"
                style={{
                  maxWidth: "1176.53px",
                  margin: "0 auto",
                }}
              >
                {content?.techSolutionsDescription ||
                  "Your story deserves more than a slow, costly production cycle. With our AI video engine, you can turn sparks of inspiration into cinematic content-on demand. Whether you're crafting personalized ads or big brand moments, we help you scale creativity without compromise."}
              </p>

              <div className="text-center mt-4 md:mt-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-[18px] md:text-[24px] petrovsans-semibold tracking-wider">
                  {content?.techSolutionsTagline || "Less waiting. More wow."}
                </span>
              </div>
            </div>

            <div className="relative flex flex-col items-center  max-w-[1272px]  mx-auto mb-32 lg:mt-[-200px]">
              <div className="top-[-60%] left-[50%]  lg:top-[-10%] lg:left-[50%] z-[2] translate-x-[0%] lg:translate-x-[0%] lg:translate-y-[20%]">
                <div
                  className="w-[180px] h-[180px] absolute top-[50%] left-[50%]"
                  style={{
                    transform: "translateX(-50%) translateY(-50%)",
                  }}
                >
                  <Image
                    fill
                    alt="s"
                    objectFit="cover"
                    src={"/agentVision/agent.png"}
                  />
                </div>
                <SVGComponent svgRef={svgRef} />
              </div>
              <div className="text-center lg:bottom-[0]">
                <h1 className="text-[58.94px] md:text-[131px] md:leading-[150px] petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-6 lg:mb-8">
                  {content?.agentVUATitle || "Agent VUA"}
                </h1>

                <p className="text-[17px] md:text-[31px] text-[#BE2FF4] outfit-light px-4 py-2 lg:py-0 mb-14">
                  {content?.agentVUADescription ||
                    "AI Powered Calling Agent for all your Pre-Sales / Post-Sales & Customer Support Requirements"}
                </p>

                <div className=" lg:h-[unset] bg-[#6210FF7A] p-- md:p-8 rounded-3xl">
                  <h1
                    className="text-[24px] md:text-[45px] text-white mb-8 md:mb-12 pt-[20px] lg:pt-[0px]"
                    style={{ fontFamily: "Outfit" }}
                  >
                    {content?.agentVUAImpactTitle || "The Impact of Agent Vua"}
                  </h1>

                  <div className="lg:grid lg:grid-cols-4 text-white gap-2 md:gap-7 text-center">
                    {(
                      content?.agentVUAFeatures || [
                        "AI Powered, Human like conversations",
                        "Real time objection handling",
                        "CRM Integrated",
                        "Available 24*7",
                      ]
                    ).map((feature, idx) => (
                      <div
                        key={idx}
                        className="py-[20px] px-1 md:px-2 border-b border-white-500 lg:border-0"
                      >
                        <h3 className="text-[19px] md:text-[35.04px] outfit-light leading-tight">
                          {feature}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[17px] md:text-[31px] text-[#BE2FF4] outfit-light text-center mt-8 md:mt-12">
                  {content?.agentVUATagline ||
                    "Agent Vua can breakeven at the cost of just 5 Agents"}
                </p>
              </div>
            </div>
          </div>

          {/* ------------------------------------- Technological Solutions Section ------------------------------------- */}
          {isDesktop === false && isDesktop !== undefined && (
            <TechnologicalSolutions
              agentVisionMobileOneContainer={agentVisionMobileOneContainer}
              agentVisionMobileVideoOne={agentVisionMobileVideoOne}
              agentVisionMobileVideoTwo={agentVisionMobileVideoTwo}
              agentVisionMobileTwoContainer={agentVisionMobileTwoContainer}
              agentVisionMobileVideoThree={agentVisionMobileVideoThree}
              content={content}
            />
          )}

          {/* ------------------------------ Desktop version ------------------------------ */}
          {isDesktop === true && isDesktop !== undefined && (
            <AgentVisionDesktop
              agentVisionRef={agentVisionRef}
              videoLeftOne={videoLeftOne}
              videoLeftTwo={videoLeftTwo}
              videoLeftThree={videoLeftThree}
              content={content}
            />
          )}

          {/* ------------------ Vr Section ------------------ */}

          <section
            ref={vrContainer}
            className="relative h-[100lvh] flex items-center justify-center text-center pt-[0px] lg:mt-[160px]"
          >
            <div
              ref={vrContainerBackdrop}
              style={{
                position: "absolute",
                height: "100svh",
                width: "100vw",
                background: "rgba(0, 0, 0, 0.8)",
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "0%",
                width: "100%",
                height: "100lvh",
                bottom: "0%",
                zIndex: 1,
              }}
            >
              <VRScene
                vrModalContainer={vrModalContainer}
                vrGroupRef={vrGroupRef}
                vrOneRef={vrOneRef}
              />
            </div>

            <div
              ref={vrVideoContainerRef}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",

                zIndex: 3,
                alignItems: "center",
                justifyContent: "center",
              }}
              className="top-[22%] left-[-8vw] lg:left-[6.5%]"
            >
              {/* SVG clip path definition */}
              <div
                style={{
                  background: "grey",
                  borderRadius: 300,
                  overflow: "hidden",
                }}
                className="w-[120vw]  lg:h-[58%]  lg:w-[82%]"
              >
                {[
                  content?.videos?.vrVideo ? content?.videos?.vrVideo : "/agentVision/2.mp4",
                ].map((iem) => (
                  <video
                    key={iem}
                    className=" w-full h-full object-cover rounded-lg"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={iem} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))}
              </div>
            </div>

            <div
              style={{
                willChange: "opacity",
                height: "100lvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                top: 0,
              }}
              ref={vrSectionContent}
            >
              <div>
                <h1 className="text-[48px] sm:text-[131px] leading-tight mt-[20px] lg:mt-[-20px] petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4]">
                  {content?.agentXRTitle || "Agent XR"}
                </h1>
                <p className="text-[17px] sm:text-[31px] text-[#BE2FF4] leading-none outfit-light mx-2 px-2 mt-[10px] text-center">
                  {content?.agentXRDescription ||
                    "Don't leave it to their imagination, immerse them in the experience"}
                </p>
              </div>

              <div className="lg:hidden">
                <div className="hidden lg:block lg:grid grid-cols-4 gap-3 text-white outfit-light text-center text-[14px] md:text-[35.04px]">
                  {(
                    content?.agentXRServices || [
                      "Virtual Reality",
                      "Digital twins",
                      "Mixed reality",
                      "Realistic renderings",
                    ]
                  ).map((service, idx) => (
                    <div key={idx} className="py-4">
                      {service}
                    </div>
                  ))}
                </div>

                <div className=" lg:grid grid-cols-3 gap-3 text-center mb-[25px] lg:mb-[10px]">
                  {(content?.agentXRStats || [
                    { value: '90%', label: 'Cost Saving' },
                    { value: '50X', label: 'Faster time to market' },
                    { value: '400%', label: 'Increased Engagement' }
                  ]).map((stat, index) => (
                    <div key={index} className="py-2">
                      <h1 className="text-[48px] md:text-[65px] leading-tight petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-4">
                        {stat.value}
                      </h1>
                      <p className="text-white text-[18px] md:text-[35.04px] outfit-light leading-none">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ----------------- i2 --------------- */}
          <div className="hidden lg:block  pt-[150px] pb-[100px]">
            <div className="lg:grid grid-cols-4 gap-3 text-white outfit-light text-center text-[14px] md:text-[35.04px] lg:mb-[70px]">
              {(
                content?.agentXRServices || [
                  "Virtual Reality",
                  "Digital twins",
                  "Mixed reality",
                  "Realistic renderings",
                ]
              ).map((service, idx) => (
                <div key={idx} className="py-4">
                  {service}
                </div>
              ))}
            </div>

            <div className=" lg:grid grid-cols-3 gap-3 text-center mb-[25px] lg:mb-[10px]">
              {(content?.agentXRStats || [
                { value: '90%', label: 'Cost Saving' },
                { value: '50X', label: 'Faster time to market' },
                { value: '400%', label: 'Increased Engagement' }
              ]).map((stat, index) => (
                <div key={index} className="py-2">
                  <h1 className="text-[48px] md:text-[65px] leading-tight petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-4">
                    {stat.value}
                  </h1>
                  <p className="text-white text-[18px] md:text-[35.04px] outfit-light leading-none">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
