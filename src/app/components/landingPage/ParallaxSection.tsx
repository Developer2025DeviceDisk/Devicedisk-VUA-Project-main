"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";
import Lenis from "@studio-freight/lenis";

interface ParallaxSection {
    title: string;
    backgroundImage: string;
}

gsap.registerPlugin(ScrollTrigger);

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



export default function ParallaxSection({ aboutContent }: any) {

  const imageRef = useRef(null);

    const parallaxContainerRef = useRef(null);
    const parallaxSection = aboutContent?.parallaxSection || {
        title: "Your Voice in the Future of Marketing.",
        backgroundImage: "/voice.jpg",
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




    return (
        <>
            <section>
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
            </section>
        </>
    );
}
