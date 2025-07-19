import Image from 'next/image';
import React from 'react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// cc

const OurFoundation = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
        opacity: 0,
        x: -100,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Animate each point in the right column with stagger
      const points = gsap.utils.toArray('.point') as HTMLElement[];
      gsap.from(points, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section
      ref={sectionRef}
      className='foundation min-h-screen flex items-center justify-center bg-[#EEF0FF] px-8 py-12'>
      <div className='flex flex-col md:flex-row w-full max-w-7xl items-center justify-between md:gap-[120px] gap-16'>
        {/* Left Side */}
        <div
          ref={leftRef}
          className='relative w-full md:w-1/2 flex-shrink-0'>
          <div className='relative w-full flex items-center justify-center min-h-[300px] sm:min-h-[450px]'>
            <h2 className='font-semibold text-[48px] sm:text-[90px] leading-[48px] sm:leading-[90px] text-[#6210FF] z-10 text-left whitespace-pre-line'>
              Our
              <br />
              Foundation
            </h2>
            <Image
              src='/GlassRing.png'
              alt='Glass Ring'
              width={512}
              height={512}
              className='absolute w-[264px] h-[264px] sm:w-[512px] sm:h-[512px] object-contain z-20 pointer-events-none select-none'
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
        </div>

        {/* Right Side */}
        <div
          ref={rightRef}
          className='flex flex-col gap-12 w-full md:w-1/2 mt-10 md:mt-0'>
          {[
            { title: 'Creativity', subtitle: 'Creativity That Inspires' },
            {
              title: 'Innovation',
              subtitle: 'Technology That Keeps You Ahead',
            },
            {
              title: 'Strategic Thinking',
              subtitle: 'Strategy That Always Makes You Win',
            },
            {
              title: 'Customer Centricity',
              subtitle: 'Everything Is About "You"',
            },
          ].map(({ title, subtitle }, index) => (
            <div
              key={index}
              className='point'>
              <h3 className='text-[32px] sm:text-[48px] font-semibold leading-[1.2] bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text'>
                {title}
              </h3>
              <p className='text-[16px] sm:text-[18px] font-light leading-[28px] mt-1 bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text'>
                {subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurFoundation;
