'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  // Refs for elements
  const heroRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const textContainerRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      gsap.set(textRefs[1].current, { y: '100%', opacity: 0 });
      gsap.set(textRefs[2].current, { y: '100%', opacity: 0 });

      // Animation sequence
      tl.to(textRefs[0].current, {
        y: '-100%',
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      })
        .to(
          img1Ref.current,
          { opacity: 0, duration: 0.8, ease: 'power2.inOut' },
          '<'
        )
        .to(
          textRefs[1].current,
          { y: '0%', opacity: 1, duration: 0.8, ease: 'power2.inOut' },
          '<0.1'
        )
        .to(
          img2Ref.current,
          { opacity: 1, duration: 0.8, ease: 'power2.inOut' },
          '<'
        )
        .to(
          textRefs[1].current,
          { y: '-100%', opacity: 0, duration: 0.8, ease: 'power2.inOut' },
          '+=0.3'
        )
        .to(
          img2Ref.current,
          { opacity: 0, duration: 0.8, ease: 'power2.inOut' },
          '<'
        )
        .to(
          textRefs[2].current,
          { y: '0%', opacity: 1, duration: 0.8, ease: 'power2.inOut' },
          '<0.1'
        )
        .to(
          img3Ref.current,
          { opacity: 1, duration: 0.8, ease: 'power2.inOut' },
          '<'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className='hero-section w-full h-[100vh] relative overflow-hidden bg-black'>
      {/* Background video */}
      <video
        className='absolute top-0 left-0 w-full h-full object-cover'
        autoPlay
        muted
        loop
        playsInline>
        <source
          src='/hero.mp4'
          type='video/mp4'
        />
      </video>

      {/* Custom shape SVG - Using your provided shape */}
      <div className='w-full absolute bottom-5 right-[-5%] h-full flex justify-end items-end pr-10 pb-10'>
        <div
          className='relative'
          style={{ width: '798px', height: '531px' }}>
          <svg
            width='798'
            height='531'
            viewBox='0 0 798 531'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='overflow-visible'>
            <defs>
              <clipPath
                id='bgblur_clip_path'
                transform='translate(0 0)'>
                <path d='M1375.24 0.0751953C1297.95 304.734 1019.35 530.063 687.749 530.063C356.147 530.063 77.2875 304.734 0.261719 0.0751953H283.56C350.664 155.118 506.282 263.906 687.749 263.906C869.217 263.906 1024.83 155.118 1091.94 0.0751953H1375.24Z' />
              </clipPath>
            </defs>

            {/* Background shape with blur effect */}
            <foreignObject
              x='0'
              y='0'
              width='798'
              height='531'>
              <div
                style={{
                  backdropFilter: 'blur(10.91px)',
                  clipPath: 'url(#bgblur_clip_path)',
                  height: '100%',
                  width: '100%',
                  background: 'rgba(180, 60, 255, 0.2)', // Semi-transparent purple
                }}></div>
            </foreignObject>

            {/* Images with clip path */}
            <image
              ref={img1Ref}
              href='/Mask.png'
              width='798'
              height='531'
              clipPath='url(#bgblur_clip_path)'
              preserveAspectRatio='xMidYMid slice'
            />
            <image
              ref={img2Ref}
              href='/mask-img1.jpg'
              width='798'
              height='531'
              clipPath='url(#bgblur_clip_path)'
              preserveAspectRatio='xMidYMid slice'
              style={{ opacity: 0 }}
            />
            <image
              ref={img3Ref}
              href='/mask-img2.jpg'
              width='798'
              height='531'
              clipPath='url(#bgblur_clip_path)'
              preserveAspectRatio='xMidYMid slice'
              style={{ opacity: 0 }}
            />
          </svg>
        </div>
      </div>

      {/* Text block */}
      <div className='relative z-10 h-full flex flex-col items-start justify-center px-6 md:px-16'>
        <h2 className='text-[85px] sm:text-[120px] text-white leading-[1.1] max-w-[800px]'>
          We are
        </h2>

        <div
          ref={textContainerRef}
          className='martech-wrapper w-full relative overflow-hidden h-[60px] sm:h-[120px]'>
          <span
            ref={textRefs[0]}
            className='absolute top-0 left-0 font-extrabold bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text text-[85px] sm:text-[120px] leading-[1.1] inline-block'>
            Mar - Tech
          </span>
          <span
            ref={textRefs[1]}
            className='absolute top-0 left-0 font-extrabold bg-gradient-to-r from-[#BE2FF4] to-[#6210FF] text-transparent bg-clip-text text-[85px] sm:text-[120px] leading-[1.1] inline-block'
            style={{ opacity: 0, transform: 'translateY(100%)' }}>
            AI-Powered
          </span>
          <span
            ref={textRefs[2]}
            className='absolute top-0 left-0 font-extrabold bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-transparent bg-clip-text text-[85px] sm:text-[120px] leading-[1.1] inline-block'
            style={{ opacity: 0, transform: 'translateY(100%)' }}>
            Marketing
          </span>
        </div>
      </div>
    </section>
  );
}
