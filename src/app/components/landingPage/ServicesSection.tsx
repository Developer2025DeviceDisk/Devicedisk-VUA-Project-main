// "use client";

// import Image from "next/image";
// import { useEffect, useRef, useState, useMemo } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import * as THREE from "three";
// import Lenis from "@studio-freight/lenis";

// interface ServiceCard {
//     id: string;
//     title: string;
//     description: string;
//     image: string;
//     tags: string[];
//     imagePosition: "left" | "right";
//     order: number;
//     isActive: boolean;
// }

// interface ServicesSection {
//     title: string;
//     backgroundImage: string;
//     cards: ServiceCard[];
// }

// const getImageUrl = (imagePath: string): string => {
//     if (!imagePath) return '';

//     // If it's already a full URL from backend, use proxy
//     if (imagePath.startsWith('https://admin.vvworx.com/')) {
//         return `/api/proxy?url=${encodeURIComponent(imagePath)}`;
//     }

//     // If it's already an HTTPS URL, return as is
//     if (imagePath.startsWith('https://')) return imagePath;

//     // If it's an uploaded image (starts with /uploads), serve from backend via proxy
//     if (imagePath.startsWith('/uploads/')) {
//         const fullUrl = `https://admin.vvworx.com${imagePath}`;
//         return `/api/proxy?url=${encodeURIComponent(fullUrl)}`;
//     }

//     // For default images in public folder, serve from frontend
//     return imagePath;
// };

// gsap.registerPlugin(ScrollTrigger);

// const mapProgress = (
//     progress: number,
//     completeAt = 0.1,
//     from = 0.8,
//     to = -0.5
// ) => {
//     if (progress < 0) return from;

//     if (progress > completeAt) return to;
//     const t = progress / completeAt;
//     return from + (to - from) * t;
// };

// export default function ServicesSection({ aboutContent }: any) {
//     const sectionRef = useRef(null);
//     const titleRef = useRef(null);
//     const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const maskRef = useRef<SVGRectElement>(null);

//     const servicesSection = aboutContent?.servicesSection || {
//         title: "Our Services",
//         backgroundImage: "/serviceVector.png",
//         cards: [],
//     };
//     const sortedCards = servicesSection.cards
//         .filter((card: any) => card.isActive)
//         .sort((a: any, b: any) => a.order - b.order);


//     useEffect(() => {
//         cardRefs.current = cardRefs.current.slice(0, sortedCards.length);
//         for (let i = cardRefs.current.length; i < sortedCards.length; i++) {
//             cardRefs.current[i] = null;
//         }
//     }, [sortedCards.length]);

//     useEffect(() => {
//         let lenis: any = null;
//         lenis = new Lenis();
//         lenis.on("scroll", ScrollTrigger.update);
//         gsap.ticker.add((time) => lenis.raf(time * 1000));
//         gsap.ticker.lagSmoothing(0);

//         return () => {
//             if (lenis) {
//                 lenis.destroy();
//             }
//         };
//     }, []);

//     useEffect(() => {
//         const servicesCtx = gsap.context(() => {
//             const tl = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: sectionRef.current,
//                     start: "top top",
//                     end: "500%",
//                     pin: true,
//                     scrub: 1,
//                 },
//             });

//             // Title out
//             tl.to(titleRef.current, {
//                 opacity: 0,
//                 y: 100,
//                 duration: 1,
//                 ease: "power3.out",
//             });

//             // Dynamic cards animation
//             cardRefs.current.forEach((cardRef, index) => {
//                 if (cardRef) {
//                     tl.to(
//                         cardRef,
//                         { top: window.innerWidth < 768 ? "10%" : "20%", duration: 1 },
//                         index === 0 ? "-=.9" : "-=.9"
//                     );
//                     if (index < cardRefs.current.length - 1) {
//                         tl.to(cardRef, { scale: 0.5, opacity: 0, duration: 1 });
//                     }
//                 }
//             });
//         }, sectionRef);

//         return () => {
//             servicesCtx.revert();
//         };
//     }, [sortedCards]);

//     return (
//         <>
//             <section>
//                 <section
//                     ref={sectionRef}
//                     className="flex min-h-screen overflow-hidden flex-col items-center justify-start bg-[#EEF0FF]"
//                 >
//                     <div className="relative" ref={titleRef}>
//                         {/* Background Image */}
//                         <div className="absolute -top-44 -left-56 -right-56 flex items-center justify-center">
//                             <Image
//                                 src={getImageUrl(servicesSection.backgroundImage)}
//                                 className="max-w-full h-auto"
//                                 alt="Decorative background"
//                                 width={1300}
//                                 height={600}
//                                 unoptimized={true}
//                             />
//                         </div>

//                         {/* Text Content */}
//                         <h1 className="text-4xl md:text-9xl pt-[20px] md:pt-[40px] text-center font-[500] text-[#6210FF] animate__animated animate__fadeInUp relative z-10 px-4">
//                             {servicesSection.title}
//                         </h1>
//                     </div>

//                     {/* Dynamic Service Cards */}
//                     {sortedCards.map((card: any, index: any) => (
//                         <div
//                             key={index}
//                             ref={(el) => {
//                                 cardRefs.current[index] = el;
//                             }}
//                             className={`absolute ${index === 0 ? "top-[40%]" : "top-[100%]"} z-${index * 10} mb-5 bg-white rounded-[10px] md:rounded-[30px] shadow-lg max-w-[90%] lg:max-w-[800px] xl:max-w-[1100px] 2xl:max-w-[70%] flex flex-col md:flex-row overflow-hidden mx-4 md:mx-0 h-[530px] md:h-[500px]`}
//                             style={{ boxShadow: "0 20px 50px -10px rgba(190, 47, 244, 0.3)" }}
//                         >
//                             <div
//                                 className={`w-full md:w-1/2 p-4 md:p-10 flex justify-center items-center ${card.imagePosition === "right" ? "order-1" : ""}`}
//                             >
//                                 <Image
//                                     width={800}
//                                     height={600}
//                                     src={getImageUrl(card.image)}
//                                     alt={card.title}
//                                     className="w-full h-full object-cover rounded-[10px] md:rounded-[30px]"
//                                     unoptimized={true}
//                                 />
//                             </div>

//                             <div
//                                 className={`w-full md:w-1/2 p-4 pt-0 ${card.imagePosition === "right" ? "md:pr-0 order-2 md:order-first" : "md:pl-0"} md:p-8 flex flex-col h-full`}
//                                 style={{ fontFamily: "'Outfit', sans-serif" }}
//                             >
//                                 <div className="flex-grow">
//                                     <h2 className="text-3xl md:text-[50px] font-outfit leading-tight text-gray-900 mb-4">
//                                         {card.title}
//                                     </h2>
//                                     <p className="text-lg sm:text-xl md:text-xl xl:text-2xl leading-tight text-gray-900 mb-6 md:mb-8">
//                                         {card.description}
//                                     </p>
//                                     <div className="flex flex-wrap gap-2 xl:gap-3 mb-2 xl:mb-6">
//                                         {card.tags.map((tag: any, tagIndex: any) => (
//                                             <span
//                                                 key={tagIndex}
//                                                 className="px-2 py-0 leading-normal xl:leading-relaxed md:px-4 md:py-2 border border-[#6210FF] text-gray-900 rounded-full text-xs xl:text-lg"
//                                             >
//                                                 {tag}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 <div className="mt-auto pt-4 md:pt-6 w-full flex md:justify-end justify-start opacity-0">
//                                     <button className="flex items-center gap-2 px-4 py-2 xl:px-6 xl:py-3 bg-white text-gray-900 border-2 border-[#6210FF] rounded-full hover:bg-gray-50 transition-all duration-200">
//                                         <span className="text-xs md:text-sm xl:text-lg font-medium">
//                                             EXPLORE MORE
//                                         </span>
//                                         <Image
//                                             src="/curve.png"
//                                             alt="Arrow icon"
//                                             className="w-4 h-4 xl:w-8 xl:h-8 object-contain"
//                                             width={30}
//                                             height={40}
//                                         />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </section>
//             </section></>
//     );
// }
