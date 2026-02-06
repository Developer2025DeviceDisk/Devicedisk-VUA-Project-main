"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper for image URLs (same logic as main file, or import from utils if available)
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.vvworx.com').replace(/\/$/, '');
const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return "";
    if (imagePath.startsWith(API_URL)) {
        return `/api/proxy?url=${encodeURIComponent(imagePath)}`;
    }
    if (imagePath.startsWith("https://")) return imagePath;
    if (imagePath.startsWith("/uploads/")) {
        const fullUrl = `${API_URL}${imagePath}`;
        return `/api/proxy?url=${encodeURIComponent(fullUrl)}`;
    }
    return imagePath;
};

interface AboutFoundationProps {
    aboutContent: any;
    foundationSection: any;
}

export default function AboutFoundation({ aboutContent, foundationSection }: AboutFoundationProps) {
    // Refs for About Section Animation
    const aboutScrollSectionRef = useRef<HTMLElement>(null);
    const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
    const aboutLine1Ref = useRef<HTMLParagraphElement>(null);
    const aboutLine2Ref = useRef<HTMLParagraphElement>(null);
    const aboutLine3Ref = useRef<HTMLParagraphElement>(null);
    const aboutLine4Ref = useRef<HTMLParagraphElement>(null);
    const aboutLine5Ref = useRef<HTMLParagraphElement>(null);
    const aboutButtonRef = useRef<HTMLAnchorElement>(null);

    // Refs for Foundation Section Animation
    const foundationTitleRef = useRef<HTMLHeadingElement>(null);
    const foundationItem1Ref = useRef<HTMLDivElement>(null);
    const foundationItem2Ref = useRef<HTMLDivElement>(null);
    const foundationItem3Ref = useRef<HTMLDivElement>(null);
    const foundationItem4Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mm = gsap.matchMedia();

        const lineRefs = [aboutLine1Ref, aboutLine2Ref, aboutLine3Ref, aboutLine4Ref, aboutLine5Ref];
        const foundationRefs = [foundationItem1Ref, foundationItem2Ref, foundationItem3Ref, foundationItem4Ref];

        mm.add("(min-width: 0px)", () => { // Check if this matches your intention, previously inside "context"
            // Set initial states for About
            lineRefs.forEach((ref) => {
                if (ref.current) {
                    gsap.set(ref.current, { y: 100, opacity: 0 });
                }
            });

            if (aboutHeadingRef.current) {
                gsap.set(aboutHeadingRef.current, { y: 100, opacity: 0 });
            }

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
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            // 1. Animate Heading First
            if (aboutHeadingRef.current) {
                tl.to(aboutHeadingRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                });
            }

            // 2. Animate Everything Else Together (Lines, Button, Foundation Items)
            const contentElements = [
                ...lineRefs.map(r => r.current),
                aboutButtonRef.current,
                ...foundationRefs.map(r => r.current)
            ].filter(Boolean); // Filter out nulls

            tl.to(contentElements, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0 // Simultaneous as requested
            }, "-=0.2");
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <section
            ref={aboutScrollSectionRef}
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#EEF0FF] py-8 lg:py-8"
        >
            <div className="relative w-full max-w-[1250px] mx-auto px-4 lg:px-8 flex flex-col lg:flex-row lg:item-center lg:justify-center gap-4 lg:gap-16 xl:gap-24">
                {/* Left Column: Dark About Card */}
                <div className="w-full lg:w-1/2 max-w-[700px] xl:max-w-[900px] ">
                    <div
                        className="relative rounded-[20px] lg:rounded-[30px] p-6 lg:p-10 xl:p-12 shadow-2xl w-full h-full flex flex-col justify-start overflow-hidden"
                    // style={{
                    //     boxShadow: "0 30px 60px -15px rgba(98, 16, 255, 0.4)",
                    // }}
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 z-0"
                            style={{
                                backgroundImage: "url('/about-card-bg.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />

                        {/* Content Wrapper - relative to sit above background */}
                        <div className="absolute inset-0 z-[5] bg-black/70" />
                        <div className="relative z-10 flex flex-col h-full">
                            {/* Title */}
                            <h2
                                ref={aboutHeadingRef}
                                style={{ fontFamily: "PetrovSans", fontWeight: 400 }}
                                className="font-light text-[48px] leading-[20.58px] lg:text-[60px] lg:leading-[40.84px] tracking-[0] capitalize text-center text-white mb-6 "
                            >
                                {aboutContent?.aboutTitle || "About Us"}
                            </h2>

                            {/* Text Lines Container */}
                            <div className="space-y-20 lg:space-y-2 mb-4 lg:mt-4 lg:px-6 lg:mb-8 text-center text-white font-medium lg:text-left">
                                {(aboutContent?.aboutTextLines || [
                                    "Lorem Ipsum Dolor Sit Amet, Consectetuer Adipiscing Elit, Sed",
                                    "Diam Nonummy Nibh Euismod Tincidunt Ut Laoreet Dolore Magna",
                                    "Aliquam Erat Volutpat. Ut Wisi Enim Ad Minim Veniam, Quis Nostrud",
                                    "Exerci Tation Ullamcorper Suscipit Lobortis Nisl Ut Aliquip Ex Ea",
                                    "Commodo Consequat."
                                ]).slice(0, 5).map((line: string, index: number) => {
                                    const refs = [aboutLine1Ref, aboutLine2Ref, aboutLine3Ref, aboutLine4Ref, aboutLine5Ref];
                                    return (
                                        <p
                                            key={index}
                                            ref={refs[index]}
                                            className="text-[19.66px] leading-[35.76px] lg:text-[33px] lg:leading-[40px] tracking-[0] capitalize text-center text-gray-300 font-light"
                                            style={{ fontFamily: "PetrovSans", fontWeight: 300 }}
                                        >
                                            {line}
                                        </p>
                                    );
                                })}

                            </div>

                            {/* Know More Button */}
                            <div className="flex justify-center md:justify-center mt-auto">
                                <Link
                                    href="/About"
                                    ref={aboutButtonRef}
                                    className="flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    <span className="text-xs lg:text-base font-medium tracking-wider">
                                        KNOW MORE
                                    </span>
                                    {/* Smiley Icon */}
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 lg:w-6 lg:h-6"
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
                    </div>
                </div>

                {/* Right Column: Our Foundation */}
                <div className="w-full  lg:w-1/2 flex flex-col gap-6 lg:gap-2 pl-2 lg:pl-0">
                    <h2
                        ref={foundationTitleRef}
                        style={{ fontFamily: "PetrovSans", fontWeight: 400 }}
                        className=" text-[48px] lg:text-[40px] xl:text-[60px] mt-4 text-[#6210FF] text-center lg:text-left"
                    >
                        {foundationSection.title}
                    </h2>

                    <div className="flex flex-col gap-6 lg:gap-8">
                        {foundationSection.foundations.slice(0, 4).map((foundation: any, index: number) => {
                            const refs = [
                                foundationItem1Ref,
                                foundationItem2Ref,
                                foundationItem3Ref,
                                foundationItem4Ref
                            ];
                            return (
                                <div
                                    key={index}
                                    ref={refs[index]}
                                    className="foundation-item "
                                >
                                    <h3 className="text-[25px] lg:text-[40px]  font-semibold text-[#727272] mb-1 text-center lg:text-left"
                                        style={{ fontFamily: "PetrovSans", fontWeight: 600 }}
                                    >
                                        {foundation.title}
                                    </h3>
                                    <p className="text-[17.55] lg:text-[24px] text-[#727272] font-normal text-center lg:text-left"
                                        style={{ fontFamily: "PetrovSans", fontWeight: 400 }}>
                                        {foundation.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section >
    );
}
