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
      yPercent: -20, // Adjust this value for stronger/weaker parallax
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

      // Cards animate in
      tl.to(card1Ref.current, { top: '20%' }, '-=.9');
      tl.to(card1Ref.current, { scale: 0.5, opacity: 0, duration: 1 });

      tl.to(card2Ref.current, { top: '20%', duration: 1 }, '-=.9');
    }, sectionRef);

    // gsap.to(imageRef.current, {
    //   yPercent: -50, // or adjust: try '-30%' for stronger parallax
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: ".parallax",
    //     start: "top center",
    //     end: "bottom top",
    //     scrub: true,
    //   },
    // });

    // gsap.from(".point", {
    //   opacity: 0,
    //   y: 50,
    //   duration: 1,
    //   stagger: 1,
    //   ease: "ease-in",
    //   scrollTrigger: {
    //     trigger: ".foundation",
    //     start: "top top",
    //     end: "bottom top",
    //     pin: true,
    //   },
    // });

    gsap.fromTo(
      maskRef.current,
      {
        scale: 0.8, // Increased from 0.6 to make it initially larger
        transformOrigin: '50% 50%',
      },
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
              willChange: 'transform', // Optimizes performance
            }}></div>

          {/* Content */}
          <h1 className='z-10 relative animate__animated animate__fadeInUp leading-snug text-white text-4xl md:text-8xl font-medium text-center p-4 rounded-lg'>
            Your Voice in the <br /> Future of Marketing.
          </h1>
        </div>
      </section>

      <div
        ref={sectionRef}
        className=' flex min-h-screen flex-col items-center justify-start  bg-[#EEF0FF]'>
        {/* <div className='absolute top-0 w-full text-center'>
          <img
            src={'/serviceVector.png'}
            className='absolute'
            alt=''
          />
        </div> */}
        <div
          className='relative'
          ref={titleRef}>
          {/* Background Image - positioned absolutely behind the text */}
          <div className='absolute absolute top-[30px] left-0 right-0 flex items-center justify-center'>
            <img
              src={'/serviceVector.png'}
              className='max-w-full h-auto opacity-50' // Adjust opacity as needed
              alt='Decorative background'
            />
          </div>

          {/* Text Content - positioned relatively */}
          <h1 className='text-6xl md:text-9xl pt-[60px] text-center font-[500] text-[#6210FF] animate__animated animate__fadeInUp relative z-10'>
            Our Services
          </h1>
        </div>

        <div
          ref={card2Ref}
          className='absolute top-[100%] z-10 bg-white rounded-[30px] shadow-2xl max-w-[1200px] w-full md:flex overflow-hidden'>
          <div className='md:w-1/2 p-10 flex justify-center items-center'>
            <img
              width={100}
              height={100}
              src={'/card-img.png'}
              alt='Main Card'
              className='w-[450px] h-auto object-cover rounded-xl'
            />
          </div>

          <div
            className='p-8 md:w-1/2 flex flex-col h-full'
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className='flex-grow'>
              {' '}
              {/* This div will take all available space except button */}
              <h2 className='text-5xl font-outfit leading-tight text-gray-900 mb-4'>
                Performance Marketing
              </h2>
              <p className='text-3xl leading-tight text-gray-900 mb-8'>
                We design digital platforms to empower users and your brand's
              </p>
              <div className='flex flex-wrap gap-3 mb-6'>
                <span className='px-4 py-2 border border-gray-300 rounded-full text-lg'>
                  Digital Strategy
                </span>
                <span className='px-4 py-2 border border-gray-300 rounded-full text-lg'>
                  Digital Activation
                </span>
                <span className='px-4 py-2 border border-gray-300 rounded-full text-lg'>
                  UX & UI Design
                </span>
                <span className='px-4 py-2 border border-gray-300 rounded-full text-lg'>
                  Web & App Development
                </span>
                <span className='px-4 py-2 border border-gray-300 rounded-full text-lg'>
                  SEO Strategy & Systems
                </span>
              </div>
            </div>

            <div className='mt-auto pt-6 w-full flex justify-end'>
              <button className='flex items-center gap-2 px-6 py-3 bg-white border-2 border-black rounded-full hover:bg-gray-50 transition-all duration-200'>
                <span className='text-xl font-medium'>EXPLORE MORE</span>
                <img
                  src='/curve.png'
                  alt='Arrow icon'
                  className='w-10 h-10 object-contain'
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={card1Ref}
          className='absolute top-[100%] z-0 bg-white rounded-[30px] shadow-2xl max-w-[1200px] w-full md:flex overflow-hidden'>
          <div className='md:w-1/2 p-10 flex justify-center items-center'>
            <img
              width={100}
              height={100}
              src={'/card-img.png'}
              alt='Main Card'
              className='w-[450px] h-auto object-cover rounded-xl'
            />
          </div>

          <div
            className='p-8 md:w-1/2 flex flex-col h-full'
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className='flex-grow'>
              {' '}
              {/* This div will take all available space except button */}
              <h2 className='text-5xl font-outfit leading-tight text-gray-900 mb-4'>
                Websites & Digital Platforms
              </h2>
              <p className='text-3xl leading-tight text-gray-900 mb-8'>
                We design digital platforms to empower users and your brand's
              </p>
              <div className='flex flex-wrap gap-3 mb-6'>
                <span className='px-4 py-2 border border-gray-300 rounded-full text-lg'>
                  Digital Strategy
                </span>
                <span className='px-4 py-2 border border-gray-300 rounded-full text-lg'>
                  Digital Activation
                </span>
                <span className='px-4 py-2 border border-gray-300 rounded-full text-lg'>
                  UX & UI Design
                </span>
                <span className='px-4 py-2 border border-gray-300 rounded-full text-lg'>
                  Web & App Development
                </span>
                <span className='px-4 py-2 border border-gray-300 rounded-full text-lg'>
                  SEO Strategy & Systems
                </span>
              </div>
            </div>

            <div className='mt-auto pt-6 w-full flex justify-end'>
              <button className='flex items-center gap-2 px-6 py-3 bg-white border-2 border-black rounded-full hover:bg-gray-50 transition-all duration-200'>
                <span className='text-xl font-medium'>EXPLORE MORE</span>
                <img
                  src='/curve.png'
                  alt='Arrow icon'
                  className='w-10 h-10 object-contain'
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
          <button className='w-20 h-20 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform'>
            <svg
              className='w-10 h-10 text-[#6210FF]'
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
