import React from "react";
import ScrollRotatingModel from "./ScrollRotatingModel";

export default function FoundationSection({ sectionRef, scrollYProgress }) {
  return (
    <section
      ref={sectionRef}
      id="foundation-section"
      className="foundation min-h-screen flex items-center justify-center bg-[#EEF0FF] px-4 sm:px-8 py-12"
    >
      <div className="flex flex-col md:flex-row w-full max-w-7xl items-center justify-between gap-8 md:gap-12 relative">
        {/* Left side - 3D model + heading */}
        <div className="relative flex-shrink-0 w-full md:w-auto min-h-[220px] sm:min-h-[320px] flex items-center justify-center">
          {/* 3D model is rendered absolutely below */}
        </div>

        {/* Right side - Animated points */}
        <div className="flex flex-col gap-6 sm:gap-10 w-full md:w-1/2">
          {[
            {
              title: "Creativity",
              subtitle: "Creativity That Inspires",
            },
            {
              title: "Innovation",
              subtitle: "Technology That Keeps You Ahead",
            },
            {
              title: "Strategic Thinking",
              subtitle: "Strategy That Always Makes You Win",
            },
            {
              title: "Customer Centricity",
              subtitle: "Everything Is About “You”",
            },
          ].map(({ title, subtitle }, index) => (
            <div className="foundation-point break-words" key={index}>
              <h3 className="text-[clamp(1.5rem,6vw,3rem)] font-extrabold leading-tight bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text break-words">
                {title}
              </h3>
              <p className="text-[clamp(1rem,4vw,1.125rem)] font-light leading-[1.6] mt-1 bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text break-words">
                {subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute z-10 w-full h-full right-0 top-0 left-0 bottom-0 pointer-events-none select-none">
        <ScrollRotatingModel scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}