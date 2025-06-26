'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import OurFoundation from './OurFoundation';

gsap.registerPlugin(ScrollTrigger);
export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const parallaxContainerRef = useRef(null);

  const maskRef = useRef<SVGRectElement>(null);
  const titleRef = useRef(null);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useEffect(() => {
    // Parallax effect for the background image
    gsap.to(imageRef.current, {
      yPercent: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: parallaxContainerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '200%',
          pin: true,
          scrub: 1,
        },
      });

      // Title out
      tl.to(titleRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out',
      });

      // Cards animate in - adjusted for mobile
      tl.to(
        card1Ref.current,
        { top: window.innerWidth < 768 ? '10%' : '20%' },
        '-=.9'
      );
      tl.to(card1Ref.current, { scale: 0.5, opacity: 0, duration: 1 });

      tl.to(
        card2Ref.current,
        { top: window.innerWidth < 768 ? '10%' : '20%', duration: 1 },
        '-=.9'
      );
    }, sectionRef);

    gsap.fromTo(
      maskRef.current,
      { scale: 0.8, transformOrigin: '50% 50%' },
      {
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.video-mask',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1,
        },
      }
    );

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Parallax Section */}
      <section
        ref={parallaxContainerRef}
        className='parallax relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden'>
        <div className='relative h-screen w-full flex flex-col justify-center items-center'>
          {/* Parallax Background Image */}
          <div
            ref={imageRef}
            className='absolute top-0 left-0 w-full h-[140%] z-0'
            style={{
              backgroundImage: "url('/voice.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              willChange: 'transform',
            }}></div>

          {/* Content */}
          <h1 className='z-10 relative animate__animated animate__fadeInUp leading-snug text-white text-3xl md:text-8xl font-medium text-center px-4 rounded-lg'>
            Your Voice in the <br /> Future of Marketing.
          </h1>
        </div>
      </section>

      <div
        ref={sectionRef}
        className='flex min-h-screen flex-col items-center justify-start bg-[#EEF0FF]'>
        <div
          className='relative'
          ref={titleRef}>
          {/* Background Image */}
          <div className='absolute top-[30px] left-0 right-0 flex items-center justify-center'>
            <img
              src={'/serviceVector.png'}
              className='max-w-full h-auto opacity-50'
              alt='Decorative background'
            />
          </div>

          {/* Text Content */}
          <h1 className='text-4xl md:text-9xl pt-[40px] md:pt-[60px] text-center font-[500] text-[#6210FF] animate__animated animate__fadeInUp relative z-10 px-4'>
            Our Services
          </h1>
        </div>

        {/* Card 2 - Performance Marketing */}
        <div
          ref={card2Ref}
          style={{ boxShadow: '0 20px 50px -10px rgba(190, 47, 244, 0.3)' }}
          className='absolute top-[100%] z-10 bg-white rounded-[20px] md:rounded-[30px] shadow-2xl max-w-[90%] md:max-w-[1200px] w-full flex flex-col md:flex-row overflow-hidden mx-4 md:mx-0'>
          <div className='w-full md:w-1/2 p-6 md:p-10 flex justify-center items-center'>
            <img
              width={100}
              height={100}
              src={'/card-img.png'}
              alt='Main Card'
              className='w-full h-auto object-cover rounded-xl'
            />
          </div>

          <div
            className='w-full md:w-1/2 p-6 md:p-8 flex flex-col h-full'
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className='flex-grow'>
              <h2 className='text-3xl md:text-5xl font-outfit leading-tight text-gray-900 mb-4'>
                Performance Marketing
              </h2>
              <p className='text-xl md:text-3xl leading-tight text-gray-900 mb-6 md:mb-8'>
                We design digital platforms to empower users and your brand's
              </p>
              <div className='flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6'>
                {[
                  'Digital Strategy',
                  'Digital Activation',
                  'UX & UI Design',
                  'Web & App Development',
                  'SEO Strategy & Systems',
                ].map((item) => (
                  <span
                    key={item}
                    className='px-3 py-1 md:px-4 md:py-2 border border-[#6210FF] text-gray-900 rounded-full text-sm md:text-lg'>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className='mt-auto pt-4 md:pt-6 w-full flex md:justify-end justify-start'>
              <button className='flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white text-gray-900 border-2 border-[#6210FF] rounded-full hover:bg-gray-50 transition-all duration-200'>
                <span className='text-base md:text-lg font-medium'>
                  EXPLORE MORE
                </span>
                <img
                  src='/curve.png'
                  alt='Arrow icon'
                  className='w-8 h-8 md:w-10 md:h-10 object-contain'
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Card 1 - Websites & Digital Platforms */}
        <div
          ref={card1Ref}
          className='absolute top-[100%] z-0 bg-white rounded-[20px] md:rounded-[30px] shadow-2xl max-w-[90%] md:max-w-[1200px] w-full flex flex-col md:flex-row overflow-hidden mx-4 md:mx-0'
          style={{ boxShadow: '0 20px 50px -10px rgba(190, 47, 244, 0.3)' }}>
          <div className='w-full md:w-1/2 p-6 md:p-10 flex justify-center items-center'>
            <img
              width={100}
              height={100}
              src={'/card-img.png'}
              alt='Main Card'
              className='w-full h-auto object-cover rounded-xl'
            />
          </div>

          <div
            className='w-full md:w-1/2 p-6 md:p-8 flex flex-col h-full'
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className='flex-grow'>
              <h2 className='text-3xl md:text-5xl font-outfit leading-tight text-gray-900 mb-4'>
                Websites & Digital Platforms
              </h2>
              <p className='text-xl md:text-3xl leading-tight text-gray-900 mb-6 md:mb-8'>
                We design digital platforms to empower users and your brand's
              </p>
              <div className='flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6'>
                {[
                  'Digital Strategy',
                  'Digital Activation',
                  'UX & UI Design',
                  'Web & App Development',
                  'SEO Strategy & Systems',
                ].map((item) => (
                  <span
                    key={item}
                    className='px-3 py-1 md:px-4 md:py-2 border border-[#6210FF] text-gray-900 rounded-full text-sm md:text-lg'>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className='mt-auto pt-4 md:pt-6 w-full flex md:justify-end justify-start'>
              <button className='flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white text-gray-900 border-2 border-[#6210FF] rounded-full hover:bg-gray-50 transition-all duration-200'>
                <span className='text-base md:text-lg font-medium'>
                  EXPLORE MORE
                </span>
                <img
                  src='/curve.png'
                  alt='Arrow icon'
                  className='w-8 h-8 md:w-10 md:h-10 object-contain'
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <OurFoundation />
      </div>

      <section className='video-mask relative w-full h-screen bg-[#EEF0FF]'>
        <svg
          className='absolute inset-0 w-full h-full'
          viewBox='0 0 1920 1080'
          preserveAspectRatio='xMidYMid slice'
          xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <mask id='rect-mask'>
              <rect
                ref={maskRef}
                x='0'
                y='0'
                width='1920'
                height='1080'
                fill='white'
              />
            </mask>
          </defs>

          <image
            href='/frame1.jpg'
            width='1920'
            height='1080'
            mask='url(#rect-mask)'
            preserveAspectRatio='xMidYMid slice'
          />
        </svg>

        <div className='relative z-10 flex justify-center items-center h-full'>
          <button className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform'>
            <svg
              className='w-8 h-8 md:w-10 md:h-10 text-[#6210FF]'
              fill='currentColor'
              viewBox='0 0 24 24'>
              <path d='M8 5v14l11-7z' />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}
