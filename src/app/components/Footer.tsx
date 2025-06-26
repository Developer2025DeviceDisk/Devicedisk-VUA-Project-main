'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faFacebookF,
  faInstagram,
  faBehance,
} from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

export default function Footer() {
  const [activeLocation, setActiveLocation] = useState(null);

  const toggleLocation = (location: any) => {
    if (activeLocation === location) {
      setActiveLocation(null);
    } else {
      setActiveLocation(location);
    }
  };

  return (
    <footer
      className='bg-gradient-to-r from-[#5F00F6] to-[#B933FF] text-white px-6 py-20'
      style={{ fontFamily: 'Outfit' }}>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start'>
        {/* First Column */}
        <div className='space-y-10'>
          <div>
            <div className='text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide'>
              <svg
                width='160'
                height='120'
                viewBox='0 0 94 52'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M75.5327 15.0625C65.5458 15.0625 57.4453 23.163 57.4453 33.15C57.4453 43.137 65.5458 51.2375 75.5327 51.2375C79.7748 51.2375 83.6758 49.7773 86.7561 47.3365V51.2375H93.6202V32.9741C93.5242 23.0724 85.4611 15.0678 75.5327 15.0678V15.0625ZM75.5327 44.3734C69.3348 44.3734 64.3094 39.3479 64.3094 33.15C64.3094 26.9521 69.3348 21.9266 75.5327 21.9266C81.7306 21.9266 86.7561 26.9521 86.7561 33.15C86.7561 39.3479 81.7306 44.3734 75.5327 44.3734Z'
                  fill='white'
                />
                <path
                  d='M89.5638 0.0498047C87.9863 6.333 82.3 10.9801 75.5319 10.9801C68.7637 10.9801 63.0721 6.333 61.5 0.0498047H67.2822C68.6518 3.24736 71.8281 5.49097 75.5319 5.49097C79.2357 5.49097 82.4119 3.24736 83.7815 0.0498047H89.5638Z'
                  fill='white'
                />
                <path
                  d='M53.6465 0.0498047L35.2233 45.8921C33.9283 49.1216 30.7947 51.2373 27.3147 51.2373C23.8347 51.2373 20.7065 49.1216 19.4061 45.8921L0.988281 0.0498047H10.0586L26.5846 41.1597C26.8511 41.8258 27.7943 41.8258 28.0608 41.1597L44.5761 0.0498047H53.6518H53.6465Z'
                  fill='white'
                />
              </svg>
            </div>
            <p className='uppercase text-sm tracking-widest'>
              Voix & Vision Worx
            </p>
          </div>
          <div className='mt-20'>
            <p className='mb-2'>Follow Us:</p>
            <div className='flex space-x-4 items-center'>
              <a
                href='#'
                className='bg-white text-[#6210FF] w-10 h-10 flex items-center justify-center rounded-full text-xl hover:scale-110 transition'>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a
                href='#'
                className='bg-white text-[#6210FF] w-10 h-10 flex items-center justify-center rounded-full text-xl hover:scale-110 transition'>
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href='#'
                className='bg-white text-[#6210FF] w-10 h-10 flex items-center justify-center rounded-full text-xl hover:scale-110 transition'>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href='#'
                className='bg-white text-[#6210FF] w-10 h-10 flex items-center justify-center rounded-full text-xl hover:scale-110 transition'>
                <FontAwesomeIcon icon={faBehance} />
              </a>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className='flex flex-col space-y-3 text-white font-medium text-xl'>
          <Link
            href='/Services'
            className='text-white'>
            Services
          </Link>
          <a
            href='/About'
            className='text-white'>
            About
          </a>
          <a href='#'>Work</a>
          <a href='#'>Culture</a>
          <Link
            href='/ContactUs'
            className='text-white'>
            Contact
          </Link>
          <a href='#'>Careers</a>
        </div>

        {/* Third Column - Locations */}
        <div className='space-y-2 text-white font-medium text-lg'>
          {/* Dubai */}
          <div className='group relative pb-4'>
            <div
              className='flex items-center text-3xl justify-between border-b border-white/60 pb-2 cursor-pointer'
              onClick={() => toggleLocation('dubai')}>
              <span>Dubai</span>
            </div>
            <div
              className={`${activeLocation === 'dubai' ? 'max-h-40' : 'max-h-0'} overflow-hidden transition-all duration-500 text-white mt-1 md:group-hover:max-h-40`}>
              <p>14th Floor, Office No 1402, Burjuman</p>
              <p>Business Tower, Burjuman, Dubai.</p>
              <p>+971 55 750 6100</p>
            </div>
          </div>

          {/* Mumbai */}
          <div className='group relative pb-4'>
            <div
              className='flex items-center text-3xl justify-between border-b border-white/60 pb-2 cursor-pointer'
              onClick={() => toggleLocation('mumbai')}>
              <span>Mumbai</span>
            </div>
            <div
              className={`${activeLocation === 'mumbai' ? 'max-h-40' : 'max-h-0'} overflow-hidden transition-all duration-500 text-white mt-1 md:group-hover:max-h-40`}>
              <p>Unit No 711, A Wing, Centrum Business Square, Road No 16,</p>
              <p> Wagle Estate, Thane(W) - 400604</p>
              <p>+91 9820 154 205</p>
            </div>
          </div>

          {/* Pune */}
          <div className='group relative pb-4'>
            <div
              className='flex items-center text-3xl justify-between border-b border-white/60 pb-2 cursor-pointer'
              onClick={() => toggleLocation('pune')}>
              <span>Pune</span>
            </div>
            <div
              className={`${activeLocation === 'pune' ? 'max-h-40' : 'max-h-0'} overflow-hidden transition-all duration-500 text-white mt-1 md:group-hover:max-h-40`}>
              <p>Office 3B, 2nd Floor, Building 3, Cerebrum IT Park,</p>
              <p>Kalyaninagar, 411032.</p>
              <p>+91 7709 233 344</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
