"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { RingScene } from "../About/Scene";
import * as THREE from "three";
import Lenis from "@studio-freight/lenis";

const getVideoUrl = (videoPath: string): string => {
  if (!videoPath) return "";

  // If it's already a full URL from backend, use proxy
  if (videoPath.startsWith("https://admin.vvworx.com/")) {
    return `/api/proxy?url=${encodeURIComponent(videoPath)}`;
  }

  // If it's already an HTTPS URL, return as is
  if (videoPath.startsWith("https://")) return videoPath;

  // If it's an uploaded video (starts with /uploads), serve from backend via proxy
  if (videoPath.startsWith("/uploads/")) {
    const fullUrl = `https://admin.vvworx.com${videoPath}`;
    return `/api/proxy?url=${encodeURIComponent(fullUrl)}`;
  }

  // For default videos in public folder, serve from frontend
  return videoPath;
};

interface VideoSection {
  videoSrc: string;
  backgroundColor: string;
}

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

export default function VideoSection({ aboutContent }: any) {
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const videoSection = aboutContent?.videoSection || {
    videoSrc: "/vua-intro.mp4",
    backgroundColor: "#EEF0FF",
  };

  // Video Section Animation
  useEffect(() => {
    const videoCtx = gsap.context(() => {
      // Video scroll trigger
      ScrollTrigger.create({
        trigger: videoSectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current
              .play()
              .catch((e) => console.log("Autoplay prevented:", e));
          }
        },
        onEnterBack: () => {
          if (videoRef.current) {
            videoRef.current
              .play()
              .catch((e) => console.log("Autoplay prevented:", e));
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
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, videoSectionRef);

    return () => {
      videoCtx.revert();
    };
  }, []);

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  return (
    <>
      <section
        ref={videoSectionRef}
        className="relative w-full h-auto md:h-screen flex items-center justify-center overflow-hidden p-0 m-0"
        style={{ backgroundColor: videoSection.backgroundColor }}
      >
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            className="w-full h-auto md:absolute md:inset-0 md:w-full md:h-full md:object-cover md:scale-[0.9]"
            playsInline
            loop
            muted
            autoPlay
            preload="auto"
            src={getVideoUrl(videoSection.videoSrc)}
          />

          {/* Sound Toggle Button */}
          <button
            onClick={toggleVideoMute}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-10 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-3 md:p-4 transition-all duration-300 backdrop-blur-sm opacity-70 hover:opacity-90"
            aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
          >
            {isVideoMuted ? (
              // Muted icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 md:w-6 md:h-6 text-white"
              >
                <path
                  d="M16.5 12C16.5 10.23 15.5 8.71 14 7.97V9.18L16.45 11.63C16.48 11.86 16.5 12.08 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              // Unmuted icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 md:w-6 md:h-6 text-white"
              >
                <path
                  d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.02C15.5 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12S16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12S18.01 4.14 14 3.23Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </section>
    </>
  );
}
