'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {

  useEffect(() => {
   
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
end: '+=1000s',
        scrub: 1,
        pin:true,
      },
    });

    tl.to('.img1', { opacity: 0, duration: .3 });
    tl.to('.img2', { opacity: 1, duration: .3 });
  
   

  }, []);

  return (
    <section className="hero-section w-full h-[100vh] relative overflow-hidden bg-black">
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
      <div className=" w-full absolute bottom-[-20%] right-[-60%] min-h-screen">
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

          {/* Optional blur overlay */}
          

          {/* First image (visible initially) */}
          <image
            className="img1"
            href="/mask-img1.jpg"
            width="875"
            height="730"
            clipPath="url(#bgblur_0_58129_2400_clip_path)"
            style={{ opacity: 1, transition: 'opacity 0.3s ease' }}
          />

          {/* Second image (fade in on scroll) */}
          <image
            className="img2"
            href="/mask-img2.jpg"
            width="875"
            height="730"
            clipPath="url(#bgblur_0_58129_2400_clip_path)"
            style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
          />
        </svg>
        </div>
      </div>

      {/* Text block left side */}
      
      <div className="relative z-10 h-full flex flex-col items-start justify-center px-6 md:px-16">
        <h2 className="text-[60px] sm:text-[120px] text-white leading-[1.1] max-w-[800px]">
          We are</h2>
     <div className="martech-wrapper w-full relative overflow-hidden">
      <span className="relative font-extrabold bg-gradient-to-r  from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text text-[60px] sm:text-[120px]">
         <span className="fst-count">
          Mar - Tech
        </span>
        {/* <span
          className="snd-count absolute top-0 left-0 w-full opacity-0"
        >
          Tech - Mar
        </span> */}
      </span>
    </div>
          
        
      </div>
    </section>
  );
}
