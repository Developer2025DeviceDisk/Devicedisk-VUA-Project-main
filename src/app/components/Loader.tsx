"use client";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { ReactNode } from "react";

export const WithGenericLoader = ({ children }: { children: ReactNode }) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [loadingAnimationData, setLoadingAnimationData] = useState(null);

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
  }, []); // Add all loading states as dependencies

  const loaderFinished = !showOverlay;

  return (
    <div 
      className="relative"
      style={{
        overflowY: loaderFinished ? "visible" : "hidden",
        height: loaderFinished ? "auto" : "100lvh",
        position: loaderFinished ? "static" : "fixed",
        overflowX: "hidden",
        zIndex: 1000,
      }}
    >
      {children}

      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center h-[100lvh] bg-purple-900 bg-opacity-95 backdrop-blur-sm">
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
