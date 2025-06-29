import React from "react";
import ScrollRotatingModel from "./ScrollRotatingModel";

export default function FoundationSection({ sectionRef, scrollYProgress }) {
  return (
    <section
      ref={sectionRef}
      id="foundation-section"
      className="foundation min-h-screen flex items-center justify-center bg-[#EEF0FF] px-8 py-12"
    >
      <div className="flex flex-col md:flex-row w-full max-w-7xl items-center justify-between gap-12 relative">
        {/* Left side - 3D model + heading */}
        <div className="relative flex-shrink-0 w-full md:w-auto min-h-[320px] flex items-center justify-center">
          
          {/* <h2 className="relative z-20 text-center text-[48px] sm:text-[90px] leading-[48px] sm:leading-[90px] font-extrabold text-[#6210FF]">
            Our
            <br />
            Foundation
          </h2> */}
        </div>

        {/* Right side - Animated points */}
        <div className="flex flex-col gap-12 w-full md:w-1/2">
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
            <div className="foundation-point" key={index}>
              <h3 className="text-[48px] font-extrabold leading-[56px] bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text">
                {title}
              </h3>
              <p className="text-[18px] font-light leading-[28px] mt-1 bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text">
                {subtitle}
              </p>
            </div>
          ))}
        </div>
       
      </div>
      <div className="absolute z-10 w-full h-full right-0 top-0 left-0 bottom-0">
            <ScrollRotatingModel scrollYProgress={scrollYProgress} />
          </div>
    </section>
  );
}
