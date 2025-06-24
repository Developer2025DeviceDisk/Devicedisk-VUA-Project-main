import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const foundationData = [
  {
    title: 'Creativity',
    subtitle: 'Creativity That Inspires',
  },
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
];

const OurFoundation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Transform values for 3D effects
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1.2, 1.2, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  
  // Smooth spring animations
  const smoothRotationY = useSpring(rotationY, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  // Content switching based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const newIndex = Math.floor(latest * foundationData.length);
      const clampedIndex = Math.max(0, Math.min(foundationData.length - 1, newIndex));
      
      if (clampedIndex !== currentIndex) {
        setCurrentIndex(clampedIndex);
      }
      
      setIsInView(latest > 0.1 && latest < 0.9);
    });

    return () => unsubscribe();
  }, [scrollYProgress, currentIndex]);

  return (
    <section ref={containerRef} className='foundation min-h-screen flex items-center justify-center bg-[#EEF0FF] px-8 py-12'>
      <div className='flex flex-col md:flex-row w-full max-w-7xl items-center justify-between gap-0 mb-30'>
        <div className='relative flex-shrink-0 flex flex-col items-start w-full md:w-auto'>
          <div className='relative flex items-center justify-start w-full md:w-auto min-h-[220px]'>
            <h2 className='animate__animated animate__fadeInLeft text-[48px] sm:text-[90px] leading-[48px] sm:leading-[90px] font-extrabold text-[#6210FF] z-10 text-left'>
              Our
              <br />
              Foundation
            </h2>
            <Image
              src={'/GlassRing.png'}
              alt='Glass Ring'
              width={100}
              height={100}
              className='absolute left-0 md:left-1/2 top-1/2 md:-translate-x-1/2 -translate-y-1/2 w-[264px] h-[110px] sm:w-[493.36px] sm:h-[448.91px] pointer-events-none select-none'
              style={{ zIndex: 1, opacity: 1 }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 sm:gap-12 w-full md:w-1/2 relative h-[300px] sm:h-[400px] items-center justify-center">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 1, y: 30 }}
              animate={{ opacity: 1, y: isInView ? 0 : 30 }}
              exit={{ opacity: 1, y: -30 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute w-full flex flex-col items-center justify-center text-center"
            >
              <h3 className="text-3xl sm:text-[48px] font-extrabold leading-tight sm:leading-[56px] bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text">
                {foundationData[currentIndex].title}
              </h3>
              <p className="text-base sm:text-[18px] font-light leading-relaxed sm:leading-[28px] mt-1 bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text">
                {foundationData[currentIndex].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default OurFoundation;