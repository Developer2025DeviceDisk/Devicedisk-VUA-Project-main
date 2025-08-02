"use client";
import { useEffect, useState } from "react";
import { AssetProvider, useAssets } from "@/contexts/AssetProvider";
import Lottie from "lottie-react";
import Services from "./main";

// Default content fallback
export const defaultContent = {
  headerTitle: "Your 360° Growth Engine",
  headerDescription: "We are India-UAE focused Tech-infused brand marketing agency offering an exhaustive services portfolio in Go-To-Market Strategy Development, Branding & Creative Solutions, AI-backed Performance & Social Media Marketing, and MarTech Automation. Founded by industry veterans, we are a passionate team offering scalable marketing solutions with a data-driven approach with presence in Mumbai, Pune and Dubai.",
  strategyTitle: "Strategy",
  strategyDescription: "We translate your aspirations into a precise and actionable blueprint for achieving your goals.",
  strategyServices: ["GTM Strategy", "Brand Strategy", "Brand Voice", "Campaign Strategy", "PR Strategy", "Social Media Strategy"],
  brandingTitle: "Branding & Design",
  brandingDescription: "We transform your vision into a tangible and impactful brand experience.",
  brandingServices: ["Brand Identity Design", "Website Design", "UI/UX Design", "Event Branding", "Office Branding", "Print & Digital Creatives"],
  contentTitle: "Content & Production",
  contentDescription: "We bring your story to life, crafting impactful content experiences that resonate.",
  contentServices: ["Influencer Marketing", "Blogs / Articles", "Conceptualization of Content", "Motion Graphics", "Creative Copywriting", "Reel Production", "High Quality Video Production"],
  digitalTitle: "Digital Marketing",
  digitalDescription: "We convert digital footprints into tangible results, connecting you with your audience and driving results.",
  digitalServices: ["Growth Marketing", "Social Media Management", "SEO Optimization"],
  techSolutionsTitle: "Technological Solution",
  techSolutionsDescription: "Your story deserves more than a slow, costly production cycle. With our AI video engine, you can turn sparks of inspiration into cinematic content-on demand. Whether you're crafting personalized ads or big brand moments, we help you scale creativity without compromise.",
  techSolutionsTagline: "Less waiting. More wow.",
  agentVUATitle: "Agent VUA",
  agentVUADescription: "AI Powered Calling Agent for all your Pre-Sales / Post-Sales & Customer Support Requirements",
  agentVUATagline: "Agent Vua can breakeven at the cost of just 5 Agents",
  agentXRTitle: "Agent XR",
  agentXRDescription: "Don't leave it to their imagination, immerse them in the experience",
  videos: {
    agentVision4: "/agentVision/4.mp4",
    agentVision6: "/agentVision/6.mp4"
  }
};

interface ServicesContentProps {
  servicesContent: any;
}

export function AppWithAssets({ servicesContent }: ServicesContentProps) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [loadingAnimationData, setLoadingAnimationData] = useState(null);
  const { jigjawLoaded, springLoaded, cloudLoaded, vrLoaded, allAssetsLoaded } =
    useAssets();

  useEffect(() => {
    fetch("/3D/LoadingAnimation2.json")
      .then((response) => response.json())
      .then((data) => setLoadingAnimationData(data))
      .catch((error) =>
        console.warn("Failed to load Lottie animation:", error)
      );
  }, []);

  useEffect(() => {
    const handleLoad = async () => {
      try {
        // Stage 1: DOM Ready

        if (document.readyState !== "complete") {
          await new Promise((resolve) => {
            window.addEventListener("load", resolve);
          });
        }

        // Stage 2: WebGL Check
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!gl) {
          console.warn("WebGL not supported");
        }

        // Stage 3: Wait for fonts
        await document.fonts.ready;

        // Stage 4: Wait for 3D components to load
        while (!jigjawLoaded) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        while (!springLoaded) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        while (!cloudLoaded) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        while (!vrLoaded) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Stage 5: Canvas initialization delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Stage 6: Final prep
        await new Promise((resolve) => setTimeout(resolve, 300));
        setTimeout(() => {
          setShowOverlay(false);
        }, 200);
      } catch (error) {
        console.error("Loading failed:", error);
        // Still proceed after error
        setTimeout(() => setShowOverlay(false), 1000);
      }
    };

    handleLoad();
  }, [jigjawLoaded, springLoaded, cloudLoaded, vrLoaded, allAssetsLoaded]); // Add all loading states as dependencies

  const loaderFinished = !showOverlay;

  return (
    <div 
      className="relative" 
      style={{
        overflowY: loaderFinished ? "visible" : "hidden",
        height: loaderFinished ? "auto" : "100lvh",
        position: loaderFinished ? "static" : "fixed",
        overflowX: "hidden",
        zIndex: 1000
      }}
    >
      <Services content={servicesContent} />

      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center h-[100lvh] justify-center bg-purple-900 bg-opacity-95 backdrop-blur-sm">
          <div className="text-center max-w-md">
            {loadingAnimationData && (
              <div className="w-[100vw] h-[100vh] mx-auto mb-6 absolute top-[30%] left-[0] lg:top-[0] lg:left-[0] items-center justify-center">
                <Lottie
                  animationData={loadingAnimationData}
                  loop={true}
                  autoplay={true}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}