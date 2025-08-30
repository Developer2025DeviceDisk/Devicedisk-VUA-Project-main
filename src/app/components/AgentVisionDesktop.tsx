"use client";

import React from 'react';

// Utility function to get full video URL
const getVideoUrl = (videoPath: string) => {
  if (!videoPath) return '';
  if (videoPath.startsWith('http')) {
    // Use proxy for HTTP URLs from backend
    if (videoPath.startsWith('https://admin.vvworx.com/')) {
      return `/api/proxy?url=${encodeURIComponent(videoPath)}`;
    }
    return videoPath; // Other HTTP/HTTPS URLs remain unchanged
  }
  // Clean up any whitespace and newlines from corrupted data
  const cleanPath = videoPath.replace(/\s+/g, '').trim();
  const fullUrl = `https://admin.vvworx.com${cleanPath}`;
  return `/api/proxy?url=${encodeURIComponent(fullUrl)}`;
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

interface AgentVisionDesktopProps {
  agentVisionRef: React.RefObject<any>;
  videoLeftOne: React.RefObject<any>;
  videoLeftTwo: React.RefObject<any>;
  videoLeftThree: React.RefObject<any>;
  content?: AgentVisionContent;
}

export default function AgentVisionDesktop({
  agentVisionRef,
  videoLeftOne,
  videoLeftTwo,
  videoLeftThree,
  content
}: AgentVisionDesktopProps) {

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

  console.log('agentVisionContent :', content)

  console.log('content?.videos :', content?.videos)

  return (
    <section className="hidden lg:block">
      <div
        ref={agentVisionRef}
        className="max-w-[1272px] mx-auto mb-[0] lg:flex"
        style={{
          height: "100vh",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          className="text-center"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "70%",
            }}
          >
            <div
              style={{
                width: "50%",
                height: "100%",
              }}
              id="video-left"
            >
              <div className="relative">
                <div
                  id="video-left-one"
                  ref={videoLeftOne}
                  className="relative"
                  style={{
                    maxWidth: "328px",
                    height: "197px",
                    background: "purple",
                    borderRadius: 20,
                    width: "100%",
                    zIndex: 2,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                            {(content?.videos?.agentVisionVideoThree || ["/agentVision/4.mp4", "/agentVision/6.mp4"]).map(
                    (iem, index) => (
                      <video
                        key={`agentVisionVideoThree-${index}-${iem}`}
                        className="absolute top-[0] left-[0]  w-full h-full object-cover rounded-lg"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={getVideoUrl(iem)} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )
                  )}
                </div>
                <h3
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: -40,
                    fontSize: 22,
                    color: "white"
                  }}
                >
                  {agentVisionContent.agentVisionVideoLabels?.launchVideos}
                </h3>
              </div>
              <svg width="0" height="0">
                <defs>
                  <clipPath
                    id="folderClip"
                    clipPathUnits="userSpaceOnUse"
                  >
                    <path d="M308.055 251C308.055 262.046 299.1 271 288.055 271H20.4297C9.384 271 0.429688 262.046 0.429688 251V99.333C0.429688 88.2873 9.38399 79.333 20.4297 79.333H127.68C143.144 79.3328 155.68 66.7969 155.68 51.333V20.75C155.68 9.7043 164.634 0.75 175.68 0.75H288.055C299.1 0.75 308.055 9.70431 308.055 20.75V251Z" />
                  </clipPath>
                </defs>
              </svg>

              <div
                className="relative"
                style={{
                  transform: "translateX(43%) translateY(-22%) ",
                }}
              >
                <div
                  className="folder-shape relative"
                  id="video-left-two"
                  ref={videoLeftTwo}
                  style={{
                    maxWidth: "307.63px",
                    width: "100%",
                    height: "270.25px",
                    background: "purple",
                    borderRadius: 20,
                    zIndex: 1,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                                   {(content?.videos?.agentVisionVideoTwo || ["/agentVision/2.mp4", "/agentVision/3.mp4"]).map(
                    (item, index) => (
                      <video
                        className="absolute top-[0] left-[0]  w-full h-full object-cover rounded-lg"
                        key={`agentVisionVideoTwo-${index}-${item}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={getVideoUrl(item)} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )
                  )}
                </div>

                <h3
                  style={{
                    position: "absolute",
                    left: "0%",
                    bottom: -40,
                    fontSize: 22,
                    color: "white"
                  }}
                >
                  {agentVisionContent.agentVisionVideoLabels?.productionFilms}
                </h3>
              </div>
            </div>
            <div
              style={{
                width: "50%",
              }}
            >
              <h1 className="text-[48px] md:text-[121px] m-[0] leading-tight petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4]">
                {agentVisionContent.agentVisionTitle?.split(' ')[0] || "Agent"}
              </h1>
              <h1
                className="text-[48px] md:text-[121px]  m-[0] leading-tight petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4]"
                style={{
                  transform: "translateX(20%)",
                }}
              >
                {agentVisionContent.agentVisionTitle?.split(' ')[1] || "Vision"}
              </h1>

              <p
                style={{
                  transform: "translateX(20%)",
                  textAlign: "left",
                }}
                className="text-[17px] md:text-[31px] text-[#BE2FF4] px-4 py-5 mb-12 outfit-light"
              >
                {agentVisionContent.agentVisionDescription?.split(' ').map((word, index, array) => {
                  if (index === Math.floor(array.length / 2)) {
                    return <React.Fragment key={index}><br />{word} </React.Fragment>;
                  }
                  return word + ' ';
                })}
              </p>
            </div>
          </div>

          <div
            style={{
              width: "27%",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
            id="video-right"
          >
            <h3 className="text-[22px] "
              style={{
                color: "white"
              }}
            >{agentVisionContent.agentVisionVideoLabels?.reelContent}</h3>

            <div
              ref={videoLeftThree}
              style={{
                height: "350px",
                width: "100%",
                maxWidth: "261px",
                background: "purple",
                margin: "0 auto",
                borderRadius: 20,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {(content?.videos?.agentVisionVideoOne || ["/agentVision/1.mp4", "/agentVision/5.mp4"]).map(
                (item, index) => (
                  <video
                    className="absolute top-[0] left-[0]  w-full h-full object-cover rounded-lg"
                    autoPlay
                    key={`agentVisionVideoOne-${index}-${item}`}
                    muted
                    loop
                    playsInline
                  >
                    <source src={getVideoUrl(item)} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )
              )}
            </div>

            <h3
              style={{
                color: "white"
              }}
              className="text-[22px]">{agentVisionContent.agentVisionVideoLabels?.projectWalkthroughs}</h3>
          </div>
        </div>

        <div className="text-center">
          <div className="grid grid-cols-3 gap-3 text-center px-4 leading-none">
            {(agentVisionContent.agentVisionStats || []).map((stat, index) => (
              <div key={index} className="py-2">
                <h1 className="text-[28px] md:text-[65px] petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-4">
                  {stat.value}
                </h1>
                <p className="text-white text-[18px] md:text-[35.04px] outfit-light">
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
      </div>
    </section>
  );
}
