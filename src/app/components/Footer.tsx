'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faFacebookF,
  faInstagram,
  faBehance,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className='bg-gradient-to-r from-[#5F00F6] to-[#B933FF] text-white px-6 py-10'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start'>
        {/* First Column */}
        <div className='space-y-6'>
          <div>
            <h1 className='text-6xl font-semibold'>Vă</h1>
            <p className='uppercase text-sm tracking-widest'>
              Voix & Vision Worx
            </p>
          </div>
          <div>
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

        {/* Rest of your footer remains the same */}
        {/* Second Column */}
        <div className='flex flex-col space-y-3 text-white font-medium text-lg'>
          <Link
            href='/'
            className='text-white'>
            Home
          </Link>
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
            <div className='flex items-center justify-between border-b border-white/60 pb-2 cursor-pointer'>
              <span>Dubai</span>
            </div>
            <div className='max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-1000 text-white mt-1'>
              <p>14th Floor, Office No 1402, Burjuman</p>
              <p>Business Tower, Burjuman, Dubai.</p>
              <p>+971 55 750 6100</p>
            </div>
          </div>

          <div className='group relative pb-4'>
            <div className='flex items-center justify-between border-b border-white/60 pb-2 cursor-pointer'>
              <span>Mumbai</span>
            </div>
            <div className='max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-1000 text-white mt-1'>
              <p>Unit No 711, A Wing, Centrum Business Square, Road No 16,</p>
              <p> Wagle Estate, Thane(W) - 400604</p>
              <p>+91 9820 154 205</p>
            </div>
          </div>

          <div className='group relative pb-4'>
            <div className='flex items-center justify-between border-b border-white/60 pb-2 cursor-pointer'>
              <span>Pune</span>
            </div>
            <div className='max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-1000 text-white mt-1'>
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
