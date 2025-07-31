"use client";

import React, { useRef, useState, useEffect } from 'react';

interface TechnologicalSolutionsProps {
  agentVisionMobileOneContainer: React.RefObject<any>;
  agentVisionMobileVideoOne: React.RefObject<any>;
  agentVisionMobileVideoTwo: React.RefObject<any>;
  agentVisionMobileTwoContainer: React.RefObject<any>;
  agentVisionMobileVideoThree: React.RefObject<any>;
  content?: any;
}

// Custom hook for intersection observer (keep only this for video loading)
const useIntersectionObserver = (ref: any, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isVisible;
};

export default function TechnologicalSolutions({
  agentVisionMobileOneContainer,
  agentVisionMobileVideoOne,
  agentVisionMobileVideoTwo,
  agentVisionMobileTwoContainer,
  agentVisionMobileVideoThree,
  content
}: TechnologicalSolutionsProps) {
  // Remove the duplicate refs since they're now passed as props

  return (
    <section
      className=" relative py-[40px] lg:py-20 lg:px-[0] px-[0] z-[10]"
    >

      {/*---------------- Agent Vision Section i1 ---------------------- */}
      <section className="block lg:hidden">
        {" "}
        <div
          className="lg:hidden"
          ref={agentVisionMobileOneContainer}
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
          id="agent-vision-mobile-1"
        >
          <div
            style={{
              width: "100%",
              textAlign: "center",
              height: "140px",
            }}
          >
            <h1 className="text-[58.94px] m-[0] leading-tight petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4]">
              {content?.agentVisionTitle || "Agent Vision"}
            </h1>

            <p
              style={{
                textAlign: "center",
              }}
              className="text-[16px] text-[#BE2FF4] px-4 outfit-light"
            >
              {content?.agentVisionDescription || "Fast, affordable production quality films"}
            </p>
          </div>

          <div
            ref={agentVisionMobileVideoOne}
            style={{
              width: "90%",
              height: "28%",
              position: "relative",
              margin: "0 auto",
              overflow: "hidden",
                    background: "purple",
                              borderRadius: 20,
            }}
          >
            { 
              (content?.videos?.agentVisionVideoTwo || ["/agentVision/2.mp4", "/agentVision/3.mp4"]).map((iem) => (
                <video
                  key={iem}
                  className="absolute top-[0] left-[0]  w-full h-full object-cover rounded-lg"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={iem} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))
            }
          </div>

          <div
            ref={agentVisionMobileVideoTwo}
            style={{
              width: "90%",
              height: "45%",
              position: "relative",
              margin: "0 auto",
              overflow: "hidden",
     background: "purple",
                         borderRadius: 20,
            }}
          >
            {
              (content?.videos?.agentVisionVideoThree || ["/agentVision/4.mp4", "/agentVision/6.mp4"]).map((iem) => (
                <video
                  key={iem}
                  className="absolute top-[0] left-[0]  w-full h-full object-cover rounded-lg"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={iem} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))
            }
          </div>
        </div>
        {/*---------------- Agent Vision Section i2 ---------------------- */}
        <div
          className="lg:hidden"
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "40px 0",
          }}
          id="agent-vision-mobile-2"
          ref={agentVisionMobileTwoContainer}
        >
          <div
            style={{
              width: "90%",
              height: "50%",
              position: "relative",
                         background: "purple",
                         borderRadius: 20,
              margin: "0 auto",
              overflow: "hidden",
            }}
            ref={agentVisionMobileVideoThree}
          >
            {
              (content?.videos?.agentVisionVideoOne || ["/agentVision/1.mp4", "/agentVision/5.mp4"]).map((iem) => (
                <video
                  key={iem}
                  className="absolute top-[0] left-[0]  w-full h-full object-cover rounded-lg"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={iem} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))
            }
          </div>

          <div
            style={{
              width: "90%",
              height: "50%",
              position: "relative",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              paddingTop: 20,
            }}
          >
            <h3 className="text-[32px] leading-tight petrovsans-normal text-white">
              Project walkthroughs
            </h3>
            <h3 className="text-[32px] leading-tight petrovsans-normal text-white">
              Launch Videos
            </h3>
            <h3 className="text-[32px] leading-tight petrovsans-normal text-white">
              Reel/content generation
            </h3>
            <h3 className="text-[32px] leading-tight petrovsans-normal text-white">
              Production & films
            </h3>
          </div>
        </div>
        <div className="text-center lg:hidden">
          <div className="text-center px-4 leading-none">
            <div className="py-[40px]">
              <h1 className="text-[57.49px]  petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-4">
                10%
              </h1>
              <p className="text-white text-[30.99px]  outfit-light">
                Production
                <br />
                Budget
              </p>
            </div>
            <div className="py-[40px]">
              <h1 className="text-[57.49px]  petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-4">
                50X
              </h1>
              <p className="text-white text-[30.99px]  outfit-light">
                Faster time
                <br />
                to market
              </p>
            </div>
            <div className="py-[40px]">
              <h1 className="text-[57.49px]  petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-4">
                100%
              </h1>
              <p className="text-white text-[30.99px]  outfit-light">
                Realistic
                <br />
                footage
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
