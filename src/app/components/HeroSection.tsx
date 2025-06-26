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
      className='hero-section w-full h-auto min-h-screen relative overflow-hidden bg-black'>
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

      {/* Content container */}
      <div className='mx-auto h-full flex flex-col lg:flex-row md:items-center justify-center px-0 md:px-0 lg:px-0 sm:px-6 mt-[4rem] md:mt-0 items-end relative z-10'>
        {/* Text block - full width on mobile, half on desktop */}
        <div className='w-full lg:w-6/12 h-auto lg:h-full flex flex-col sm:mt-20  items-center lg:items-start justify-center py-8 md:pl-32 lg:py-0 pl-10'>
          <h2 className='w-full text-5xl xs:text-6xl sm:text-7xl lg:text-[50px] xl:text-[80px] 2xl:text-[127px] text-white leading-[1.1] font-medium'>
            We are
          </h2>

          <div
            ref={textContainerRef}
            className='martech-wrapper w-full relative overflow-hidden h-[72px] xs:h-[84px] sm:h-[102px] md:h-[180px]'>
            <span
              ref={textRefs[0]}
              className='absolute top-0 left-0 w-full font-extrabold bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[60px] xl:text-[90px] 2xl:text-[139px] leading-[1.2] inline-block'>
              Mar - Tech
            </span>
            <span
              ref={textRefs[1]}
              className='absolute top-0 left-0 w-full font-extrabold bg-gradient-to-r from-[#BE2FF4] to-[#6210FF] text-transparent bg-clip-text text-5xl sm:text-7xl md:text-8xl lg:text-[60px] xl:text-[90px] 2xl:text-[130px] leading-[1.2] inline-block'
              style={{ opacity: 0, transform: 'translateY(100%)' }}>
              AI-Powered
            </span>
            <span
              ref={textRefs[2]}
              className='absolute top-0 left-0 w-full font-extrabold bg-gradient-to-r from-[#BE2FF4] to-[#6210FF] text-transparent bg-clip-text text-5xl sm:text-7xl md:text-8xl lg:text-[60px] xl:text-[90px] 2xl:text-[139px] leading-[1.2] inline-block'
              style={{ opacity: 0, transform: 'translateY(100%)' }}>
              Marketing
            </span>
          </div>
        </div>

        {/* Image block - full width on mobile, half on desktop */}
        <div className='w-full lg:w-6/12 pl-4 sm:pl-0.5 md:pl-0 h-auto lg:h-full flex items-center justify-center relative lg:order-none'>
          <div className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-full flex justify-center items-center lg:items-end relative'>
            <svg
              width='100%'
              height='100%'
              viewBox='0 0 798 531'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='xMidYMid meet'
              className='overflow-visible max-w-[600px] lg:max-w-none'>
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
                width='100%'
                height='100%'>
                <div
                  style={{
                    backdropFilter: 'blur(10.91px)',
                    clipPath: 'url(#bgblur_clip_path)',
                    height: '100%',
                    width: '100%',
                    background: 'rgba(180, 60, 255, 0.2)',
                  }}></div>
              </foreignObject>

              {/* Images with clip path */}
              <image
                ref={img1Ref}
                href='/Mask.png'
                width='100%'
                height='100%'
                clipPath='url(#bgblur_clip_path)'
                preserveAspectRatio='xMidYMid slice'
              />
              <image
                ref={img2Ref}
                href='/mask-img1.jpg'
                width='100%'
                height='100%'
                clipPath='url(#bgblur_clip_path)'
                preserveAspectRatio='xMidYMid slice'
                style={{ opacity: 0 }}
              />
              <image
                ref={img3Ref}
                href='/mask-img2.jpg'
                width='100%'
                height='100%'
                clipPath='url(#bgblur_clip_path)'
                preserveAspectRatio='xMidYMid slice'
                style={{ opacity: 0 }}
              />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}