"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function Header({ ref }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOnLightBg, setIsOnLightBg] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu function
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Effect to detect background color changes based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const elementsUnderHeader = document.elementsFromPoint(
        window.innerWidth / 2,
        70
      );

      const hasLightBackground = elementsUnderHeader.some((element) => {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        const bgClasses = String(element.className || "");

        return (
          bgClasses.indexOf("bg-[#EEF0FF]") !== -1 ||
          bgColor === "rgb(238, 240, 255)" // #EEF0FF in RGB
        );
      });

      setIsOnLightBg(hasLightBackground);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links array
  const navLinks = [
    { title: "Services", href: "/services" },
    { title: "Product", href: "/product" },
    { title: "About", href: "/about" },
    { title: "Work", href: "/work" },
    { title: "Culture", href: "/culture" },
    { title: "Contact us", href: "/contact" },
  ];

  return (
    <>
      <header
      ref={ref}
        className={`fixed top-0 left-0 w-full z-50 mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 ${
          isOnLightBg
            ? "text-[#6210FF] bg-[rgba(114,40,255,0.05)] backdrop-blur-md"
            : "text-white backdrop-blur-md"
        } z-50 transition-all duration-300`}
             style={{ willChange: 'transform',
              }}
      >
        <div className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide">
          <Link href="/">
            <svg
              className="w-[64px] h-[35px] sm:w-[94px] sm:h-[52px]" // Small on mobile, original on sm+
              viewBox="0 0 94 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M75.5327 15.0625C65.5458 15.0625 57.4453 23.163 57.4453 33.15C57.4453 43.137 65.5458 51.2375 75.5327 51.2375C79.7748 51.2375 83.6758 49.7773 86.7561 47.3365V51.2375H93.6202V32.9741C93.5242 23.0724 85.4611 15.0678 75.5327 15.0678V15.0625ZM75.5327 44.3734C69.3348 44.3734 64.3094 39.3479 64.3094 33.15C64.3094 26.9521 69.3348 21.9266 75.5327 21.9266C81.7306 21.9266 86.7561 26.9521 86.7561 33.15C86.7561 39.3479 81.7306 44.3734 75.5327 44.3734Z"
                fill={isOnLightBg ? "#6210FF" : "white"}
              />
              <path
                d="M89.5638 0.0498047C87.9863 6.333 82.3 10.9801 75.5319 10.9801C68.7637 10.9801 63.0721 6.333 61.5 0.0498047H67.2822C68.6518 3.24736 71.8281 5.49097 75.5319 5.49097C79.2357 5.49097 82.4119 3.24736 83.7815 0.0498047H89.5638Z"
                fill={isOnLightBg ? "#6210FF" : "white"}
              />
              <path
                d="M53.6465 0.0498047L35.2233 45.8921C33.9283 49.1216 30.7947 51.2373 27.3147 51.2373C23.8347 51.2373 20.7065 49.1216 19.4061 45.8921L0.988281 0.0498047H10.0586L26.5846 41.1597C26.8511 41.8258 27.7943 41.8258 28.0608 41.1597L44.5761 0.0498047H53.6518H53.6465Z"
                fill={isOnLightBg ? "#6210FF" : "white"}
              />
            </svg>
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className={`w-9 h-9 sm:w-10 sm:h-10 cursor-pointer rounded-full border hidden ${
            isOnLightBg ? "border-[#6210FF]" : "border-white"
          } flex items-center justify-center ${
            isOnLightBg ? "hover:bg-[#6210FF]/10" : "hover:bg-white/10"
          } transition-colors duration-200`}
        >
          <div className="space-y-1">
            <span
              className={`block w-5 h-0.5 ${
                isOnLightBg ? "bg-[#6210FF]" : "bg-white"
              } transition-all duration-300`}
            ></span>
            <span
              className={`block w-5 h-0.5 ${
                isOnLightBg ? "bg-[#6210FF]" : "bg-white"
              } transition-all duration-300`}
            ></span>
          </div>
        </button>
      </header>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "opacity-100 backdrop-blur-md"
            : "opacity-0 backdrop-blur-0 pointer-events-none"
        }`}
        style={{
          background: isMenuOpen
            ? "linear-gradient(135deg, rgba(45, 39, 68, 0.95), rgba(33, 28, 48, 0.95))"
            : "transparent",
        }}
      >
        {/* Menu Content */}
        <div
          className={`absolute inset-0 flex flex-col transition-transform duration-700 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 pt-8">
            <div className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide text-white">
              <svg
                width="94"
                height="52"
                viewBox="0 0 94 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M75.5327 15.2539C65.5458 15.2539 57.4453 23.3544 57.4453 33.3414C57.4453 43.3284 65.5458 51.4289 75.5327 51.4289C79.7748 51.4289 83.6758 49.9687 86.7561 47.5279V51.4289H93.6202V33.1655C93.5242 23.2638 85.4611 15.2592 75.5327 15.2592V15.2539ZM75.5327 44.5648C69.3348 44.5648 64.3094 39.5393 64.3094 33.3414C64.3094 27.1435 69.3348 22.118 75.5327 22.118C81.7306 22.118 86.7561 27.1435 86.7561 33.3414C86.7561 39.5393 81.7306 44.5648 75.5327 44.5648Z" />
                <path d="M89.5638 0.238281C87.9863 6.52147 82.3 11.1686 75.5319 11.1686C68.7637 11.1686 63.0721 6.52147 61.5 0.238281H67.2822C68.6518 3.43583 71.8281 5.67945 75.5319 5.67945C79.2357 5.67945 82.4119 3.43583 83.7815 0.238281H89.5638Z" />
                <path d="M53.6465 0.238281L35.2233 46.0805C33.9283 49.3101 30.7947 51.4258 27.3147 51.4258C23.8347 51.4258 20.7065 49.3101 19.4061 46.0805L0.988281 0.238281H10.0586L26.5846 41.3482C26.8511 42.0143 27.7943 42.0143 28.0608 41.3482L44.5761 0.238281H53.6518H53.6465Z" />
              </svg>
            </div>

            <button
              onClick={closeMenu}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-all duration-200 hover:border-white/50 cursor-pointer"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 flex flex-col justify-center items-end px-4 sm:px-6 space-y-6 sm:space-y-8">
            {navLinks.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={closeMenu}
                className={`text-2xl sm:text-4xl md:text-5xl font-light text-white/90 hover:text-white transition-all duration-300 hover:translate-x-[-10px] ${
                  isMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isMenuOpen
                    ? `${index * 100 + 200}ms`
                    : "0ms",
                }}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Bottom Accent */}
          <div className="px-6 pb-8">
            <div
              className={`w-16 sm:w-24 h-0.5 bg-gradient-to-r from-white/50 to-transparent ml-auto transition-all duration-500 ${
                isMenuOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: isMenuOpen ? "800ms" : "0ms" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
