import Image from 'next/image'
import React from 'react'

const OurFoundation = () => {
  return (
    <section  className="foundation min-h-screen flex items-center justify-center bg-[#EEF0FF] px-8 py-12">
  <div className="flex flex-col md:flex-row w-full max-w-7xl items-center justify-between gap-0 mb-30">

   
    <div className="relative flex-shrink-0 flex flex-col items-start w-full md:w-auto">
      <div className="relative flex items-center justify-start w-full md:w-auto min-h-[220px]">
        <h2 className="animate__animated animate__fadeInLeft text-[48px] sm:text-[90px] leading-[48px] sm:leading-[90px] font-extrabold text-[#6210FF] z-10 text-left">
          Our<br />Foundation
        </h2>
        <Image
          src={'/GlassRing.png'}
          alt="Glass Ring" width={ 100 } height = { 100 }
          className="absolute left-0 md:left-1/2 top-1/2 md:-translate-x-1/2 -translate-y-1/2 w-[264px] h-[110px] sm:w-[493.36px] sm:h-[448.91px] pointer-events-none select-none"
          style={{ zIndex: 1 }}
        />
      </div>
    </div>

<div  className="flex flex-col gap-12 w-full md:w-1/2">
      {[
        {
          title: 'Creativity',
          subtitle: 'Creativity That Inspires',
        },
        {
          title: 'Innovation',
          subtitle: 'Technology That Keeps You Ahead',
        },
        {
          title: 'Strategic Thinking',
          subtitle: 'Strategy That Always Makes You Win',
        },
        {
          title: 'Customer Centricity',
          subtitle: 'Everything Is About “You”',
        },
      ].map(({ title, subtitle }, index) => (
        <div key={index} className="point">
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
</section>
  )
}

export default OurFoundation