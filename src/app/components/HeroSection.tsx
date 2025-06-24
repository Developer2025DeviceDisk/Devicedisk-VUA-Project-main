'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<SVGImageElement>(null);
  const img2Ref = useRef<SVGImageElement>(null);
  const img3Ref = useRef<SVGImageElement>(null);
  const firstTextRef = useRef<HTMLSpanElement>(null);
  const secondTextRef = useRef<HTMLSpanElement>(null);
  const thirdTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=3000',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Set initial states
      gsap.set([img2Ref.current, img3Ref.current], { opacity: 0 });
      gsap.set([secondTextRef.current, thirdTextRef.current], { 
        opacity: 0, 
        y: 20,
        rotationX: -90 
      });

      // First transition: Mar-Tech → Tech-Mar + img1 → img2
      tl.to(firstTextRef.current, { 
        opacity: 0, 
        y: -20, 
        rotationX: 90,
        duration: 0.3,
        ease: "power2.inOut"
      })
      .to(img1Ref.current, { 
        opacity: 0, 
        duration: 0.3,
        ease: "power2.inOut"
      }, "<")
      .to(secondTextRef.current, { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 0.3,
        ease: "power2.inOut"
      }, "<0.1")
      .to(img2Ref.current, { 
        opacity: 1, 
        duration: 0.3,
        ease: "power2.inOut"
      }, "<")

      // Second transition: Tech-Mar → Marketing + img2 → img3
      .to(secondTextRef.current, { 
        opacity: 0, 
        y: -20, 
        rotationX: 90,
        duration: 0.3,
        ease: "power2.inOut"
      }, "+=0.5")
      .to(img2Ref.current, { 
        opacity: 0, 
        duration: 0.3,
        ease: "power2.inOut"
      }, "<")
      .to(thirdTextRef.current, { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 0.3,
        ease: "power2.inOut"
      }, "<0.1")
      .to(img3Ref.current, { 
        opacity: 1, 
        duration: 0.3,
        ease: "power2.inOut"
      }, "<");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-section w-full h-[100vh] relative overflow-hidden bg-black">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Custom shape SVG positioned right */}
      <div className="w-full absolute bottom-[-20%] right-[-70%] min-h-screen">
        <div className='svg-col w-full'>
          <svg
            width="975"
            height="530"
            viewBox="0 0 1375 530"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath
                id="bgblur_0_58129_2400_clip_path"
                transform="translate(21.812 21.812)"
              >
                <path d="M282.971 0.5C350.223 155.56 505.933 264.331 687.487 264.331C869.041 264.331 1024.75 155.561 1092 0.5H1374.33C1296.88 304.623 1018.63 529.487 687.487 529.487C356.342 529.487 77.836 304.622 0.643555 0.5H282.971Z" />
              </clipPath>
            </defs>

            {/* First image (visible initially) */}
            <image
              ref={img1Ref}
              className="img1"
              href="/Mask.png"
              width="875"
              height="730"
              clipPath="url(#bgblur_0_58129_2400_clip_path)"
            />

            {/* Second image (fade in on scroll) */}
            <image
              ref={img2Ref}
              className="img2"
              href="/mask-img1.jpg"
              width="875"
              height="730"
              clipPath="url(#bgblur_0_58129_2400_clip_path)"
            />

            {/* Third image (fade in on scroll) */}
            <image
              ref={img3Ref}
              className="img3"
              href="/mask-img2.jpg"
              width="875"
              height="730"
              clipPath="url(#bgblur_0_58129_2400_clip_path)"
            />
          </svg>
        </div>
      </div>

      {/* Text block left side */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center px-6 md:px-16">
        <h2 className="text-[60px] sm:text-[120px] text-white leading-[1.1] max-w-[800px]">
          We are
        </h2>
        
        <div className="martech-wrapper w-full relative overflow-hidden h-[60px] sm:h-[120px]">
          {/* First text: Mar - Tech */}
          <span 
            ref={firstTextRef}
            className="absolute top-0 left-0 font-extrabold bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text text-[60px] sm:text-[120px] leading-[1.1]"
          >
            Mar - Tech
          </span>
          
          {/* Second text: Tech - Mar */}
          <span 
            ref={secondTextRef}
            className="absolute top-0 left-0 font-extrabold bg-gradient-to-r from-[#BE2FF4] to-[#6210FF] text-transparent bg-clip-text text-[60px] sm:text-[120px] leading-[1.1]"
          >
            Tech - Mar
          </span>
          
          {/* Third text: Marketing */}
          <span 
            ref={thirdTextRef}
            className="absolute top-0 left-0 font-extrabold bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-transparent bg-clip-text text-[60px] sm:text-[120px] leading-[1.1]"
          >
            Marketing
          </span>
        </div>
      </div>
    </section>
  );
}