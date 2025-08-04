"use client";

import React, { useRef, useState, useEffect } from 'react';

// Utility function to get full video URL
const getVideoUrl = (videoPath: string) => {
  if (!videoPath) return '';
  if (videoPath.startsWith('http')) return videoPath; // Already a full URL
  // Clean up any whitespace and newlines from corrupted data
  const cleanPath = videoPath.replace(/\s+/g, '').trim();
  return `http://localhost:8000${cleanPath}`;
};

interface StatisticItem {
  value: string;
  description: string;
}

interface VideoLabels {
  launchVideos: string;
  productionFilms: string;
  reelContent: string;
  projectWalkthroughs: string;
}

interface AgentVisionContent {
  agentVisionTitle?: string;
  agentVisionDescription?: string;
  agentVisionVideoLabels?: VideoLabels;
  agentVisionStats?: StatisticItem[];
  videos?: {
    agentVisionVideoOne?: string[];
    agentVisionVideoTwo?: string[];
    agentVisionVideoThree?: string[];
  };
}

interface TechnologicalSolutionsProps {
  agentVisionMobileOneContainer: React.RefObject<any>;
  agentVisionMobileVideoOne: React.RefObject<any>;
  agentVisionMobileVideoTwo: React.RefObject<any>;
  agentVisionMobileTwoContainer: React.RefObject<any>;
  agentVisionMobileVideoThree: React.RefObject<any>;
  content?: AgentVisionContent;
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

  // Default content if none provided
  const defaultContent: AgentVisionContent = {
    agentVisionTitle: "Agent Vision",
    agentVisionDescription: "Fast, affordable production quality films",
    agentVisionVideoLabels: {
      launchVideos: "Launch Videos",
      productionFilms: "Production & films",
      reelContent: "Reel/content generation",
      projectWalkthroughs: "Project walkthroughs"
    },
    agentVisionStats: [
      {
        value: "10%",
        description: "Production\nBudget"
      },
      {
        value: "50X",
        description: "Faster time\nto market"
      },
      {
        value: "100%",
        description: "Realistic\nfootage"
      }
    ]
  };

  const agentVisionContent = {
    ...defaultContent,
    agentVisionTitle: content?.agentVisionTitle || defaultContent.agentVisionTitle,
    agentVisionDescription: content?.agentVisionDescription || defaultContent.agentVisionDescription,
    agentVisionVideoLabels: {
      ...defaultContent.agentVisionVideoLabels,
      ...content?.agentVisionVideoLabels
    },
    agentVisionStats: content?.agentVisionStats || defaultContent.agentVisionStats
  };

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
              {agentVisionContent.agentVisionTitle}
            </h1>

            <p
              style={{
                textAlign: "center",
              }}
              className="text-[16px] text-[#BE2FF4] px-4 outfit-light"
            >
              {agentVisionContent.agentVisionDescription}
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
              (content?.videos?.agentVisionVideoTwo || ["/agentVision/2.mp4", "/agentVision/3.mp4"]).map((iem, index) => (
                <video
                  key={`agentVisionVideoTwo-mobile-${index}-${iem}`}
                  className="absolute top-[0] left-[0]  w-full h-full object-cover rounded-lg"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={getVideoUrl(iem)} type="video/mp4" />
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
              (content?.videos?.agentVisionVideoThree || ["/agentVision/4.mp4", "/agentVision/6.mp4"]).map((iem, index) => (
                <video
                  key={`agentVisionVideoThree-mobile-${index}-${iem}`}
                  className="absolute top-[0] left-[0]  w-full h-full object-cover rounded-lg"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={getVideoUrl(iem)} type="video/mp4" />
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
              (content?.videos?.agentVisionVideoOne || ["/agentVision/1.mp4", "/agentVision/5.mp4"]).map((iem, index) => (
                <video
                  key={`agentVisionVideoOne-mobile-${index}-${iem}`}
                  className="absolute top-[0] left-[0]  w-full h-full object-cover rounded-lg"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={getVideoUrl(iem)} type="video/mp4" />
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
              {agentVisionContent.agentVisionVideoLabels?.projectWalkthroughs}
            </h3>
            <h3 className="text-[32px] leading-tight petrovsans-normal text-white">
              {agentVisionContent.agentVisionVideoLabels?.launchVideos}
            </h3>
            <h3 className="text-[32px] leading-tight petrovsans-normal text-white">
              {agentVisionContent.agentVisionVideoLabels?.reelContent}
            </h3>
            <h3 className="text-[32px] leading-tight petrovsans-normal text-white">
              {agentVisionContent.agentVisionVideoLabels?.productionFilms}
            </h3>
          </div>
        </div>
        <div className="text-center lg:hidden">
          <div className="text-center px-4 leading-none">
            {(agentVisionContent.agentVisionStats || []).map((stat, index) => (
              <div key={index} className="py-[40px]">
                <h1 className="text-[57.49px]  petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-4">
                  {stat.value}
                </h1>
                <p className="text-white text-[30.99px]  outfit-light">
                  {stat.description.split('\n').map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line}
                      {lineIndex < stat.description.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
