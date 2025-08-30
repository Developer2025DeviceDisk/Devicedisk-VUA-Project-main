import * as React from "react";
const SVGComponent = ({svgRef, ...props}: any) => {
    
return(  <svg
    width={550}
    ref={svgRef}
    height={550}
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <clipPath id="circleView">
        <circle cx={150} cy={150} r={60} />
      </clipPath>
    </defs>
   
    <g
      stroke="#BE2FF4"
      strokeWidth={6}
      strokeLinecap="round"
      opacity={0.7}
    >
      <g transform="translate(150, 150)">
           <line className="radar-pulse" x1="60" y1="0" x2="75" y2="0" transform="rotate(0)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(14.4)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(28.8)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(43.2)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(57.6)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(72)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(86.4)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(100.8)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(115.2)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(129.6)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(144)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(158.4)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(172.8)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(187.2)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(201.6)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(216)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(230.4)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(244.8)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(259.2)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(273.6)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(288)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(302.4)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(316.8)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(331.2)" />
      <line x1="60" y1="0" x2="75" y2="0" transform="rotate(345.6)" />
      </g>
    </g>
  </svg>)
}
export default SVGComponent;
