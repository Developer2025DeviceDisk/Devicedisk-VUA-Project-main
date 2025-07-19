'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import OurFoundation from './OurFoundation';
import FoundationSection from './FoundationSection';
import { RingScene } from '../About/Scene';
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

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

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const parallaxContainerRef = useRef(null);

  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const maskRef = useRef<SVGRectElement>(null);
  const titleRef = useRef(null);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);
  const card6Ref = useRef(null);
  const card7Ref = useRef(null);
  const scrollYProgress = useRef(0);


  // -------------- Foundation section refs --------------
  const foundationSectionRef = useRef<HTMLElement>(null);
    const foundationTitleRef = useRef<THREE.Object3D>(null);
    const foundationTitleTopRef = useRef<THREE.Mesh>(null);
    const foundationTitleBottomRef = useRef<THREE.Mesh>(null);
  
    const foundationMobileTitle = useRef<HTMLDivElement>(null);
    const foundationContent1Ref = useRef<HTMLDivElement>(null);
    const foundationContent2Ref = useRef<HTMLDivElement>(null);
    const foundationContent3Ref = useRef<HTMLDivElement>(null);
    const foundationContent4Ref = useRef<HTMLDivElement>(null);
  
    const modalGroupRef = useRef<THREE.Group>(null);
    const torus = useRef<THREE.Mesh>(null);
    const torus001 = useRef<THREE.Mesh>(null);
    const torus002 = useRef<THREE.Mesh>(null);
    const torus003 = useRef<THREE.Mesh>(null);
  


  useEffect(() => {
    // Parallax effect for the background image
    gsap.to(imageRef.current, {
      y: () => (window.innerWidth < 768 ? -80 : -150), // move upward in pixels
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
          end: '500%',
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

      // Cards animate in - adjusted for  00
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
      tl.to(card2Ref.current, { scale: 0.5, opacity: 0, duration: 1 });

      tl.to(
        card3Ref.current,
        { top: window.innerWidth < 768 ? '10%' : '20%', duration: 1 },
        '-=.9'
      );
      tl.to(card3Ref.current, { scale: 0.5, opacity: 0, duration: 1 });

      tl.to(
        card4Ref.current,
        { top: window.innerWidth < 768 ? '10%' : '20%', duration: 1 },
        '-=.9'
      );
      tl.to(card4Ref.current, { scale: 0.5, opacity: 0, duration: 1 });

      tl.to(
        card5Ref.current,
        { top: window.innerWidth < 768 ? '10%' : '20%', duration: 1 },
        '-=.9'
      );
      tl.to(card5Ref.current, { scale: 0.5, opacity: 0, duration: 1 });

      tl.to(
        card6Ref.current,
        { top: window.innerWidth < 768 ? '10%' : '20%', duration: 1 },
        '-=.9'
      );
      tl.to(card6Ref.current, { scale: 0.5, opacity: 0, duration: 1 });

      tl.to(
        card7Ref.current,
        { top: window.innerWidth < 768 ? '10%' : '20%', duration: 1 },
        '-=.9'
      );
    }, sectionRef);

    /*

    gsap.fromTo(
      maskRef.current,
      { scale: 0.8, transformOrigin: "50% 50%" },
      {
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".video-mask",
          start: "top center",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    );

    */

    // foundation section gsap
  // ---------- Foundation Section Animation ----------

    gsap.set(
      [
        foundationContent1Ref.current,
        foundationContent2Ref.current,
        foundationContent3Ref.current,
        foundationContent4Ref.current,
      ],
      {
        yPercent: 50,
        opacity: 0,
      }
    );

    if (foundationMobileTitle.current) {
      gsap.set(foundationMobileTitle.current, {
        xPercent: -50,
        opacity: 0,
      });
    }

    // First ScrollTrigger: Handle the pinning and positioning
    ScrollTrigger.create({
      trigger: foundationSectionRef.current,
      start: "top 50%",
      end: "top top",
      scrub: true,
      onUpdate: ({ progress }) => {
        const animatedFramesParts = 1;

        if (torus001.current && modalGroupRef.current && torus002.current) {
          // Animated per frames
          if (foundationTitleRef.current) {
            const foundationTitlePorgess = mapProgress(
              progress,
              animatedFramesParts,
              6,
              5.0 // desktop
            );
            const foundationTitleOpacityPorgess = mapProgress(
              progress,
              animatedFramesParts,
              0,
              1
            );

            gsap.to(foundationTitleRef.current.position, {
              z: foundationTitlePorgess,
              duration: 0,
            });

            gsap.to(foundationTitleTopRef.current, {
              opacity: foundationTitleOpacityPorgess,
              duration: 0,
            });
            gsap.to(foundationTitleBottomRef.current, {
              opacity: foundationTitleOpacityPorgess,
              duration: 0,
            });
          }

          if (foundationMobileTitle.current) {
            const foundationTitleOpacityPorgess = mapProgress(
              progress,
              animatedFramesParts,
              0,
              1
            );

            gsap.to(foundationMobileTitle.current, {
              xPercent: -50 + foundationTitleOpacityPorgess * 50,
              opacity: foundationTitleOpacityPorgess,
            });
          }
        }
      },
    });

    ScrollTrigger.create({
      trigger: foundationSectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 4}px`,
      pin: true,
      pinSpacing: true,
      scrub: false,
      onUpdate: ({ progress }) => {
        const animatedFramesParts = 1 / 5;

        if (
          torus001.current &&
          modalGroupRef.current &&
          torus002.current &&
          torus003.current &&
          torus.current
        ) {
          const groupRotationProgress = mapProgress(progress, 1, -180, 180);

          gsap.to(modalGroupRef.current.rotation, {
            y: THREE.MathUtils.degToRad(groupRotationProgress),
            duration: 0,
          });

          // -------------------------- Frame 2 --------------------------
          const foundationContent1Y = mapProgress(
            progress - animatedFramesParts * 0,
            animatedFramesParts / 4, // how long you want the animation to last
            50,
            0
          );
          const foundationContent1Opacity = mapProgress(
            progress - animatedFramesParts * 0,
            animatedFramesParts / 4, // how long you want the animation to last
            0,
            1
          );
          gsap.to(foundationContent1Ref.current, {
            yPercent: foundationContent1Y,
            opacity: foundationContent1Opacity,
            duration: 0,
          });

          const torus1Progress = mapProgress(
            progress - animatedFramesParts * 0,
            animatedFramesParts / 4, // how long you want the animation to last
            -25,
            0
          );
          gsap.to(torus001.current.position, {
            y: torus1Progress,
            duration: 0,
          });

          // -------------------------- Frame 3 --------------------------

          const foundationContent2Y = mapProgress(
            progress - animatedFramesParts * 1,
            animatedFramesParts / 4, // how long you want the animation to last
            50,
            0
          );
          const foundationContent2pacity = mapProgress(
            progress - animatedFramesParts * 1,
            animatedFramesParts / 4, // how long you want the animation to last
            0,
            1
          );

          gsap.to(foundationContent2Ref.current, {
            yPercent: foundationContent2Y,
            opacity: foundationContent2pacity,
            duration: 0,
          });

          const torus2Progress = mapProgress(
            progress - animatedFramesParts * 1,
            animatedFramesParts / 4,
            -30,
            0
          );
          gsap.to(torus002.current.position, {
            z: torus2Progress,
            direction: 0,
          });

          // -------------------------- Frame 4 --------------------------

          const foundationContent3Y = mapProgress(
            progress - animatedFramesParts * 2,
            animatedFramesParts / 4, // how long you want the animation to last
            50,
            0
          );
          const foundationContent3Opacity = mapProgress(
            progress - animatedFramesParts * 2,
            animatedFramesParts / 4, // how long you want the animation to last
            0,
            1
          );
          gsap.to(foundationContent3Ref.current, {
            yPercent: foundationContent3Y,
            opacity: foundationContent3Opacity,
            duration: 0,
          });
          const torus3Progress = mapProgress(
            progress - animatedFramesParts * 2,
            animatedFramesParts / 4,
            30,
            0
          );
          gsap.to(torus003.current.position, {
            y: torus3Progress,
            direction: 0,
          });

          // -------------------------- Frame 5 --------------------------

          const foundationContent4Y = mapProgress(
            progress - animatedFramesParts * 3,
            animatedFramesParts / 4, // how long you want the animation to last
            50,
            0
          );
          const foundationContent4Opacity = mapProgress(
            progress - animatedFramesParts * 3,
            animatedFramesParts / 4, // how long you want the animation to last
            0,
            1
          );
          gsap.to(foundationContent4Ref.current, {
            yPercent: foundationContent4Y,
            opacity: foundationContent4Opacity,
            duration: 0,
          });
          const torus4Progress = mapProgress(
            progress - animatedFramesParts * 3,
            animatedFramesParts / 4,
            -30,
            0
          );

          gsap.to(torus.current.position, {
            y: torus4Progress,
            direction: 0,
          });

          // -------------------------- Frame 6 --------------------------
          const torusAllProgress = mapProgress(
            progress - animatedFramesParts * 4,
            animatedFramesParts / 4,
            0,
            1
          );
          gsap.to(torus001.current.position, {
            x: -1 + torusAllProgress,
            z: 1 - torusAllProgress,
            duration: 0,
          });

          gsap.to(torus002.current.position, {
            x: -1 + torusAllProgress,
            duration: 0,
          });

          gsap.to(torus003.current.position, {
            x: 1 - torusAllProgress,
            z: -1 + torusAllProgress,
            duration: 0,
          });

          gsap.to(torus.current.position, {
            x: 1 - torusAllProgress,
            z: 1 - torusAllProgress,
            duration: 0,
          });
        }
      },
    });

    //end foundation section gsap

    // Video scroll trigger
    ScrollTrigger.create({
      trigger: videoSectionRef.current,
      start: 'top 70%',
      end: 'bottom 30%',
      onEnter: () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current
            .play()
            .catch((e) => console.log('Autoplay prevented:', e));
        }
      },
      onEnterBack: () => {
        if (videoRef.current) {
          videoRef.current
            .play()
            .catch((e) => console.log('Autoplay prevented:', e));
        }
      },
      onLeave: () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      onLeaveBack: () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      },
    });

    // Video scale animation
    gsap.fromTo(
      videoRef.current,
      { scale: 0.9 },
      {
        scale: 1.1,
        scrollTrigger: {
          trigger: videoSectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
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
            className='absolute top-0 left-0 w-full h-[120%] z-0'
            style={{
              backgroundImage: "url('/voice.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              willChange: 'transform',
            }}></div>

          {/* Content */}
          <h1 className='z-10 relative animate__animated animate__fadeInUp leading-snug text-white text-4xl md:text-8xl font-medium text-center px-4 rounded-lg'>
            Your Voice in the <br /> Future of Marketing.
          </h1>
        </div>
      </section>

      <div
        ref={sectionRef}
        className='flex min-h-screen overflow-hidden flex-col items-center justify-start bg-[#EEF0FF]'>
        <div
          className='relative'
          ref={titleRef}>
          {/* Background Image */}
          <div className='absolute -top-44 -left-56 -right-56 flex items-center justify-center'>
            <Image
              src={'/serviceVector.png'}
              className='max-w-full h-auto'
              alt='Decorative background'
              width={1300}
              height={600}
              unoptimized={true}
            />
          </div>

          {/* Text Content */}
          <h1 className='text-4xl md:text-9xl pt-[20px] md:pt-[40px] text-center font-[500] text-[#6210FF] animate__animated animate__fadeInUp relative z-10 px-4'>
            Our Services
          </h1>
        </div>

        {/* Card 1 - Websites & Digital Platforms */}
        <div
          ref={card1Ref}
          className='absolute top-[40%] z-0 mb-5 bg-white rounded-[10px] md:rounded-[30px] shadow-lg max-w-[90%] lg:max-w-[800px] xl:max-w-[1100px] 2xl:max-w-[70%] flex flex-col md:flex-row overflow-hidden mx-4 md:mx-0 h-[530px] md:h-[500px]'
          style={{ boxShadow: '0 20px 50px -10px rgba(190, 47, 244, 0.3)' }}>
          <div className='w-full md:w-1/2 p-4 md:p-10 flex justify-center items-center'>
            <Image
              width={800}
              height={600}
              src={'/strategy.jpeg'}
              alt='Websites & Digital Platforms'
              className='w-full h-full object-cover rounded-[10px] md:rounded-[30px]'
              unoptimized={true}
            />
          </div>

          <div
            className='w-full md:w-1/2 p-4 pt-0 md:pl-0 md:p-8 flex flex-col h-full'
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className='flex-grow'>
              <h2 className='text-3xl md:text-[50px] font-outfit leading-tight text-gray-900 mb-4'>
                Strategy
              </h2>
              <p className='text-lg sm:text-xl md:text-xl xl:text-2xl leading-tight text-gray-900 mb-6 md:mb-8'>
                We translate your aspirations into a precise and actionable
                blueprint for achieving your goals.
              </p>
              <div className='flex flex-wrap gap-2 xl:gap-3 mb-2 xl:mb-6'>
                {[
                  'Brand Strategy',
                  'Brand Voice',
                  'GTM Strategy',
                  'Campaign Strategy',
                  'PR Strategy',
                  'Social Media Strategy',
                ].map((item) => (
                  <span
                    key={item}
                    className='px-2 py-0 leading-normal xl:leading-relaxed md:px-4 md:py-2 border border-[#6210FF] text-gray-900 rounded-full text-xs xl:text-lg'>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className='mt-auto pt-4 md:pt-6 w-full flex md:justify-end justify-start opacity-0'>
              <button className='flex items-center gap-2 px-4 py-2 xl:px-6 xl:py-3 bg-white text-gray-900 border-2 border-[#6210FF] rounded-full hover:bg-gray-50 transition-all duration-200'>
                <span className='text-xs md:text-sm xl:text-lg font-medium'>
                  EXPLORE MORE
                </span>
                <Image
                  src='/curve.png'
                  alt='Arrow icon'
                  className='w-4 h-4 xl:w-8 xl:h-8 object-contain'
                  width={30}
                  height={40}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 - Performance Marketing */}
        <div
          ref={card2Ref}
          className='absolute top-[100%] z-10 mb-5 bg-white rounded-[10px] md:rounded-[30px] shadow-lg max-w-[90%] lg:max-w-[800px] xl:max-w-[1100px] 2xl:max-w-[70%] flex flex-col md:flex-row overflow-hidden mx-4 md:mx-0 h-[530px] md:h-[500px]'
          style={{ boxShadow: '0 20px 50px -10px rgba(190, 47, 244, 0.3)' }}>
          <div className='w-full md:w-1/2 p-4 md:p-10 flex justify-center items-center order-1'>
            <Image
              width={800}
              height={600}
              src={'/brand.jpg'}
              alt='Performance Marketing'
              className='w-full h-full object-cover rounded-[10px] md:rounded-[30px] '
              unoptimized={true}
            />
          </div>

          <div
            className='w-full md:w-1/2 p-4 pt-0 md:pr-0 md:p-8 flex flex-col h-full order-2 md:order-first'
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className='flex-grow'>
              <h2 className='text-3xl md:text-[50px] font-outfit leading-tight text-gray-900 mb-4'>
                Branding & Design
              </h2>
              <p className='text-lg sm:text-xl md:text-xl xl:text-2xl leading-tight text-gray-900 mb-6 md:mb-8'>
                We transform your vision into a tangible and impactful brand
                experience.
              </p>
              <div className='flex flex-wrap gap-2 xl:gap-3 mb-2 xl:mb-6'>
                {[
                  'Brand Identity Design',
                  'Office Branding',
                  'Event Branding',
                  'Print & Digital Creatives',
                  'Website Design',
                  'UI/UX Design',
                ].map((item) => (
                  <span
                    key={item}
                    className='px-2 py-0 leading-normal xl:leading-relaxed md:px-4 md:py-2 border border-[#6210FF] text-gray-900 rounded-full text-xs xl:text-lg'>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className='mt-auto pt-4 md:pt-6 w-full flex md:justify-end justify-start opacity-0'>
              <button className='flex items-center gap-2 px-4 py-2 xl:px-6 xl:py-3 bg-white text-gray-900 border-2 border-[#6210FF] rounded-full hover:bg-gray-50 transition-all duration-200'>
                <span className='text-xs md:text-sm xl:text-lg font-medium'>
                  EXPLORE MORE
                </span>
                <Image
                  src='/curve.png'
                  alt='Arrow icon'
                  width={30}
                  height={40}
                  className='w-4 h-4 xl:w-8 xl:h-8 object-contain'
                />
              </button>
            </div>
          </div>
        </div>

        {/* Card 3 - Brand Strategy */}
        <div
          ref={card3Ref}
          className='absolute top-[100%] z-20 mb-5 bg-white rounded-[10px] md:rounded-[30px] shadow-lg max-w-[90%] lg:max-w-[800px] xl:max-w-[1100px] 2xl:max-w-[70%] flex flex-col md:flex-row overflow-hidden mx-4 md:mx-0 h-[530px] md:h-[500px]'
          style={{ boxShadow: '0 20px 50px -10px rgba(190, 47, 244, 0.3)' }}>
          <div className='w-full md:w-1/2 p-4 md:p-10 flex justify-center items-center'>
            <Image
              width={800}
              height={600}
              src={'/content.jpeg'}
              alt='Brand Strategy'
              className='w-full h-full object-cover rounded-[10px] md:rounded-[30px]'
              unoptimized={true}
            />
          </div>

          <div
            className='w-full md:w-1/2 p-4 pt-0 md:pl-0 md:p-8 flex flex-col h-full'
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className='flex-grow'>
              <h2 className='text-3xl md:text-[50px] font-outfit leading-tight text-gray-900 mb-4'>
                Content &amp; Production
              </h2>
              <p className='text-lg sm:text-xl md:text-xl xl:text-2xl leading-tight text-gray-900 mb-6 md:mb-8'>
                We bring your story to life, crafting impactful content
                experiences that resonate.
              </p>
              <div className='flex flex-wrap gap-2 xl:gap-3 mb-2 xl:mb-6'>
                {[
                  'Influencer Marketing',
                  'Conceptualization of Content',
                  'High Quality Video Shoot & Production',
                  'Reel Production',
                  'Motion Graphics',
                  'Creative Copywriting',
                  ' Blogs / Articles',
                ].map((item) => (
                  <span
                    key={item}
                    className='px-2 py-0 leading-normal xl:leading-relaxed md:px-4 md:py-2 border border-[#6210FF] text-gray-900 rounded-full text-xs xl:text-lg'>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className='mt-auto pt-2 md:pt-2 w-full flex md:justify-end justify-start opacity-0'>
              <button className='flex items-center gap-2 px-4 py-2 xl:px-6 xl:py-3 bg-white text-gray-900 border-2 border-[#6210FF] rounded-full hover:bg-gray-50 transition-all duration-200'>
                <span className='text-xs md:text-sm xl:text-lg font-medium'>
                  EXPLORE MORE
                </span>
                <Image
                  src='/curve.png'
                  alt='Arrow icon'
                  className='w-4 h-4 xl:w-8 xl:h-8 object-contain'
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Card 4 - Content Creation */}
        <div
          ref={card4Ref}
          className='absolute top-[100%] z-30 mb-5 bg-white rounded-[10px] md:rounded-[30px] shadow-lg max-w-[90%] lg:max-w-[800px] xl:max-w-[1100px] 2xl:max-w-[70%] flex flex-col md:flex-row overflow-hidden mx-4 md:mx-0 h-[530px] md:h-[500px]'
          style={{ boxShadow: '0 20px 50px -10px rgba(190, 47, 244, 0.3)' }}>
          <div className='w-full md:w-1/2 p-4 md:p-10 flex justify-center items-center order-1'>
            <Image
              width={800}
              height={600}
              src={'/digital.jpeg'}
              alt='Content Creation'
              className='w-full h-full object-cover rounded-[10px] md:rounded-[30px]'
              unoptimized={true}
            />
          </div>

          <div
            className='w-full md:w-1/2 p-4 pt-0 md:pr-0 md:p-8 flex flex-col h-full order-2 md:order-first'
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className='flex-grow'>
              <h2 className='text-3xl md:text-[50px] font-outfit leading-tight text-gray-900 mb-4'>
                Digital Marketing
              </h2>
              <p className='text-lg sm:text-xl md:text-xl xl:text-2xl leading-tight text-gray-900 mb-6 md:mb-8'>
                We convert digital footprints into tangible results, connecting
                you with your audience and driving results.
              </p>
              <div className='flex flex-wrap gap-2 xl:gap-3 mb-2 xl:mb-6'>
                {[
                  'Growth Marketing (Push & Pull Mediums)',
                  'Social Media Management Packages',
                  'SEO Optimization & Ranking',
                ].map((item) => (
                  <span
                    key={item}
                    className='px-2 py-0 leading-normal xl:leading-relaxed md:px-4 md:py-2 border border-[#6210FF] text-gray-900 rounded-full text-xs xl:text-lg'>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className='mt-auto pt-4 md:pt-6 w-full flex md:justify-end justify-start opacity-0'>
              <button className='flex items-center gap-2 px-4 py-2 xl:px-6 xl:py-3 bg-white text-gray-900 border-2 border-[#6210FF] rounded-full hover:bg-gray-50 transition-all duration-200'>
                <span className='text-xs md:text-sm xl:text-lg font-medium'>
                  EXPLORE MORE
                </span>
                <Image
                  src='/curve.png'
                  alt='Arrow icon'
                  className='w-4 h-4 xl:w-8 xl:h-8 object-contain'
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Card 5 - Social Media Management */}
        <div
          ref={card5Ref}
          className='absolute top-[100%] z-40 mb-5 bg-white rounded-[10px] md:rounded-[30px] shadow-lg max-w-[90%] lg:max-w-[800px] xl:max-w-[1100px] 2xl:max-w-[70%] flex flex-col md:flex-row overflow-hidden mx-4 md:mx-0 h-[530px] md:h-[500px]'
          style={{ boxShadow: '0 20px 50px -10px rgba(190, 47, 244, 0.3)' }}>
          <div className='w-full md:w-1/2 p-4 md:p-10 flex justify-center items-center'>
            <Image
              width={800}
              height={600}
              src={'/vua.jpeg'}
              alt='Social Media Management'
              className='w-full h-full object-cover rounded-[10px] md:rounded-[30px]'
              unoptimized={true}
            />
          </div>

          <div
            className='w-full md:w-1/2 p-4 pt-0 md:pl-0 md:p-8 flex flex-col h-full'
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className='flex-grow'>
              <h2 className='text-3xl md:text-[50px] font-outfit leading-tight text-gray-900 mb-4'>
                Agent Vua
              </h2>
              <p className='text-lg sm:text-xl md:text-xl xl:text-2xl leading-tight text-gray-900 mb-6 md:mb-8'>
                AI Powered Calling Agent for all your Pre-Sales / Post-Sales &
                Customer Support Requirements
              </p>
              <div className='flex flex-wrap gap-2 xl:gap-3 mb-2 xl:mb-6'>
                {[
                  'AI Powered, Human like conversations',
                  'Real time objection handling',

                  'CRM Integrated',
                  'Available 24*7',
                ].map((item) => (
                  <span
                    key={item}
                    className='px-2 py-0 leading-normal xl:leading-relaxed md:px-4 md:py-2 border border-[#6210FF] text-gray-900 rounded-full text-xs xl:text-lg'>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className='mt-auto pt-4 md:pt-6 w-full flex md:justify-end justify-start opacity-0'>
              <button className='flex items-center gap-2 px-4 py-2 xl:px-6 xl:py-3 bg-white text-gray-900 border-2 border-[#6210FF] rounded-full hover:bg-gray-50 transition-all duration-200'>
                <span className='text-xs md:text-sm xl:text-lg font-medium'>
                  EXPLORE MORE
                </span>
                <Image
                  src='/curve.png'
                  alt='Arrow icon'
                  className='w-4 h-4 xl:w-8 xl:h-8 object-contain'
                  width={30}
                  height={50}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Card 6 - E-commerce Solutions */}
        <div
          ref={card6Ref}
          className='absolute top-[100%] z-50 mb-5 bg-white rounded-[10px] md:rounded-[30px] shadow-lg max-w-[90%] lg:max-w-[800px] xl:max-w-[1100px] 2xl:max-w-[70%] flex flex-col md:flex-row overflow-hidden mx-4 md:mx-0 h-[530px] md:h-[500px]'
          style={{ boxShadow: '0 20px 50px -10px rgba(190, 47, 244, 0.3)' }}>
          <div className='w-full md:w-1/2 p-4 md:p-10 flex justify-center items-center order-1'>
            <Image
              width={800}
              height={600}
              src={'/vision.png'}
              alt='E-commerce Solutions'
              className='w-full h-full object-cover rounded-[10px] md:rounded-[30px] '
              unoptimized={true}
            />
          </div>

          <div
            className='w-full md:w-1/2 p-4 pt-0 md:pr-0 md:p-8 flex flex-col h-full order-2  md:order-first'
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className='flex-grow'>
              <h2 className='text-3xl md:text-[50px] font-outfit leading-tight text-gray-900 mb-4'>
                Agent Vision
              </h2>
              <p className='text-lg sm:text-xl md:text-xl xl:text-2xl leading-tight text-gray-900 mb-6 md:mb-8'>
                Fast, Affordable, Production Quality Films – Generated by AI
              </p>
              <div className='flex flex-wrap gap-2 xl:gap-3 mb-2 xl:mb-6'>
                {[
                  'Project Walkthroughs',
                  'Launch Videos',
                  'Reel / Content Generation',
                  'Production & Films',
                ].map((item) => (
                  <span
                    key={item}
                    className='px-2 py-0 leading-normal xl:leading-relaxed md:px-4 md:py-2 border border-[#6210FF] text-gray-900 rounded-full text-xs xl:text-lg'>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className='mt-auto pt-4 md:pt-6 w-full flex md:justify-end justify-start opacity-0'>
              <button className='flex items-center gap-2 px-4 py-2 xl:px-6 xl:py-3 bg-white text-gray-900 border-2 border-[#6210FF] rounded-full hover:bg-gray-50 transition-all duration-200'>
                <span className='text-xs md:text-sm xl:text-lg font-medium'>
                  EXPLORE MORE
                </span>
                <Image
                  src='/curve.png'
                  alt='Arrow icon'
                  className='w-4 h-4 xl:w-8 xl:h-8 object-contain'
                  width={30}
                  height={40}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Card 7 - Data Analytics */}
        <div
          ref={card7Ref}
          className='absolute top-[100%] z-60 mb-5 bg-white rounded-[10px] md:rounded-[30px] shadow-lg max-w-[90%] lg:max-w-[800px] xl:max-w-[1100px] 2xl:max-w-[70%] flex flex-col md:flex-row overflow-hidden mx-4 md:mx-0 h-[530px] md:h-[500px]'
          style={{ boxShadow: '0 20px 50px -10px rgba(190, 47, 244, 0.3)' }}>
          <div className='w-full md:w-1/2 p-4 md:p-10 flex justify-center items-center'>
            <Image
              width={800}
              height={600}
              src={'/xr.jpeg'}
              alt='Data Analytics'
              className='w-full h-full object-cover rounded-[10px] md:rounded-[30px] '
              unoptimized={true}
            />
          </div>

          <div
            className='w-full md:w-1/2 p-4 pt-0 md:pl-0 md:p-8 flex flex-col h-full'
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className='flex-grow'>
              <h2 className='text-3xl md:text-[50px] font-outfit leading-tight text-gray-900 mb-4'>
                Agent XR
              </h2>
              <p className='text-lg sm:text-xl md:text-xl xl:text-2xl leading-tight text-gray-900 mb-6 md:mb-8'>
                Don’t leave it to their Imagination, Immerse them in the
                Experience
              </p>
              <div className='flex flex-wrap gap-2 xl:gap-3 mb-2 xl:mb-6'>
                {[
                  'Virtual Reality',
                  'Digital Twins',
                  'Mixed Reality',
                  'Realistic Renderings',
                ].map((item) => (
                  <span
                    key={item}
                    className='px-2 py-0 leading-normal xl:leading-relaxed md:px-4 md:py-2 border border-[#6210FF] text-gray-900 rounded-full text-xs xl:text-lg'>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className='mt-auto pt-4 md:pt-6 w-full flex md:justify-end justify-start opacity-0'>
              <button className='flex items-center gap-2 px-4 py-2 xl:px-6 xl:py-3 bg-white text-gray-900 border-2 border-[#6210FF] rounded-full hover:bg-gray-50 transition-all duration-200'>
                <span className='text-xs md:text-sm xl:text-lg font-medium'>
                  EXPLORE MORE
                </span>
                <Image
                  src='/curve.png'
                  alt='Arrow icon'
                  className='w-4 h-4 xl:w-8 xl:h-8 object-contain'
                  width={30}
                  height={40}
                />
              </button>
            </div>
          </div>
        </div>
      </div>


        <section
          ref={foundationSectionRef}
          className="relative w-screen h-screen text-zinc-900 bg-[#6310FF] overflow-hidden"
        >
          <section
            style={{
              position: "absolute",
              left: "0%",
              width: "100%",
              height: "100vh",
              bottom: "0%",
              zIndex: 1,
            }}
          >
            <RingScene
              modalGroupRef={modalGroupRef}
              torus={torus}
              torus001={torus001}
              torus002={torus002}
              torus003={torus003}
              foundationTitleRef={foundationTitleRef}
              foundationTitleTopRef={foundationTitleTopRef}
              foundationTitleBottomRef={foundationTitleBottomRef}
            />
          </section>

          <div
            className="absolute right-0 top-[120px] w-full h-screen z-[2]  pl-8 gap-7
             lg:w-1/2  lg:gap-8 lg:top-0 lg:hidden
            "
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div ref={foundationMobileTitle}>
                <h2 className="text-[50px] text-white font-[400] m-0 leading-[45px]        max-[350px]:text-[40px] lg:text-6xl">
                  Our
                </h2>
                <h2 className="text-[50px] text-white font-[400] m-0 leading-[45px]        max-[350px]:text-[40px] lg:text-6xl">
                  Foundation
                </h2>
              </div>
            </div>
          </div>

          <div
            className="absolute right-0 bottom-[40px] w-full h-screen z-[2] flex flex-col items-start justify-end pl-8 gap-7
            max-[350px]:gap-[14px]
             lg:w-1/2  lg:gap-[5.5%] lg:bottom-0 lg:justify-center
            "
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div ref={foundationContent1Ref}>
                <h2 className="text-[35px] text-white font-medium m-0  max-[350px]:text-[27px]  lg:text-[3rem]">
                  Creativity
                </h2>
                <p className="text-base text-white font-medium m-0">
                  Creativity that inspires
                </p>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div ref={foundationContent2Ref}>
                <h2 className="text-[35px] text-white font-medium m-0 max-[350px]:text-[27px]  lg:text-[3rem]">
                  Innovation
                </h2>
                <p className="text-base text-white font-medium m-0">
                  Technology that keeps You ahead
                </p>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div ref={foundationContent3Ref}>
                <h2 className="text-[35px] text-white font-medium m-0 max-[350px]:text-[27px]  lg:text-[3rem]">
                  Strategic Thinking
                </h2>
                <p className="text-base text-white font-medium m-0">
                  Strategy that always makes you win
                </p>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div ref={foundationContent4Ref}>
                <h2 className="text-[35px] text-white font-medium m-0 max-[350px]:text-[27px]  lg:text-[3rem]">
                  Customer Centricity
                </h2>
                <p className="text-base text-white font-medium m-0">
                  Everything is about “You”
                </p>
              </div>
            </div>
          </div>
        </section>


      {/* Video Section */}
      <section
        ref={videoSectionRef}
        className='relative w-full h-auto md:h-screen bg-[#EEF0FF] flex items-center justify-center overflow-hidden p-0 m-0'>
        <video
          ref={videoRef}
          className='w-full h-auto md:absolute md:inset-0 md:w-full md:h-full md:object-cover md:scale-[0.9]'
          playsInline
          loop
          preload='auto'
          src='/vua-intro.mp4'
        />
      </section>
    </>
  );
}
