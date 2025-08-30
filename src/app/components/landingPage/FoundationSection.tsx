"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { RingScene } from "../../About/Scene";
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

export default function FoundationSection({ aboutContent }: any) {

    
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

   const sortedFoundations = foundationSection.foundations.sort(
    (a:any, b:any) => a.order - b.order
  );

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

  return (
    <>
    <section>
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
      </section></>
  )
}
