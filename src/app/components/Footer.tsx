'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faFacebookF,
  faInstagram,
  faBehance,
  faYoutube,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

// TypeScript interfaces
interface SocialLink {
  platform: string;
  url: string;
  isActive: boolean;
}

interface NavigationLink {
  text: string;
  url: string;
  isActive: boolean;
  order: number;
}

interface Address {
  line1: string;
  line2?: string;
  line3?: string;
}

interface OfficeLocation {
  city: string;
  isActive: boolean;
  address: Address;
  phone: string;
  order: number;
}

interface CompanyInfo {
  name: string;
  logo: string;
  description?: string;
}

interface SocialLinks {
  followText: string;
  links: SocialLink[];
}

interface NavigationMenu {
  title: string;
  links: NavigationLink[];
}

interface Styling {
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
}

interface FooterContent {
  companyInfo?: CompanyInfo;
  socialLinks?: SocialLinks;
  navigationMenu?: NavigationMenu;
  officeLocations?: OfficeLocation[];
  styling?: Styling;
}

interface FooterProps {
  content?: FooterContent;
}

export default function Footer({ content }: FooterProps) {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  // Default content fallback
  const getDefaultFooterContent = (): FooterContent => ({
    companyInfo: {
      name: 'Voix & Vision Worx',
      logo: 'default-logo.svg',
      description: ''
    },
    socialLinks: {
      followText: 'Follow Us:',
      links: [
        { platform: 'linkedin', url: 'https://www.linkedin.com/company/voix-vision-worx/', isActive: true },
        { platform: 'facebook', url: 'https://www.facebook.com/people/Voix-Vision-Worx/61575858395596/', isActive: true },
        { platform: 'instagram', url: 'http://instagram.com/vvworx/', isActive: true },
        { platform: 'behance', url: 'https://www.behance.net/vvworx', isActive: true },
        { platform: 'youtube', url: 'http://www.youtube.com/@VVWorx', isActive: true }
      ]
    },
    navigationMenu: {
      title: 'Quick Links',
      links: [
        { text: 'Home', url: '/', isActive: true, order: 1 },
        { text: 'Services', url: '/services', isActive: true, order: 2 },
        { text: 'About Us', url: '/About', isActive: true, order: 3 },
        { text: 'Contact Us', url: '/contact', isActive: true, order: 4 },
        { text: 'Privacy Policy', url: '/privacy-policy', isActive: true, order: 5 }
      ]
    },
    officeLocations: [
      {
        city: 'Dubai',
        isActive: true,
        address: {
          line1: '14th Floor, Office No 1402, Burjuman',
          line2: 'Business Tower, Burjuman, Dubai.'
        },
        phone: '+971 56 189 9800',
        order: 1
      },
      {
        city: 'Mumbai',
        isActive: true,
        address: {
          line1: 'Unit No 711, A Wing, Centrum Business Square, Road No 16,',
          line2: 'Wagle Estate, Thane(W) - 400604'
        },
        phone: '+91 877 96 32312',
        order: 2
      },
      {
        city: 'Pune',
        isActive: true,
        address: {
          line1: 'Office 3B, 2nd Floor, Building 3, Cerebrum IT Park,',
          line2: 'Kalyaninagar, 411032.'
        },
        phone: '+91 797 67 48422',
        order: 3
      }
    ],
    styling: {
      backgroundColor: 'bg-gradient-to-r from-[#5F00F6] to-[#B933FF]',
      textColor: 'text-white',
      fontFamily: 'Outfit'
    }
  });

  const toggleLocation = (location: string) => {
    if (activeLocation === location) {
      setActiveLocation(null);
    } else {
      setActiveLocation(location);
    }
  };

  // Get social media icon
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return faLinkedinIn;
      case 'facebook':
        return faFacebookF;
      case 'instagram':
        return faInstagram;
      case 'behance':
        return faBehance;
      case 'youtube':
        return faYoutube;
      case 'twitter':
        return faTwitter;
      default:
        return faLinkedinIn;
    }
  };

  // Use content or fallback to defaults
  const footerContent = content || getDefaultFooterContent();
  const activeSocialLinks = footerContent.socialLinks?.links?.filter(link => link.isActive) || [];
  const activeNavigationLinks = footerContent.navigationMenu?.links?.filter(link => link.isActive)?.sort((a, b) => a.order - b.order) || [];
  const activeOfficeLocations = footerContent.officeLocations?.filter(location => location.isActive)?.sort((a, b) => a.order - b.order) || [];

  return (
    <footer
      className={`${footerContent.styling?.backgroundColor || 'bg-gradient-to-r from-[#5F00F6] to-[#B933FF]'} ${footerContent.styling?.textColor || 'text-white'} px-6 py-20`}
      style={{ fontFamily: footerContent.styling?.fontFamily || 'Outfit' }}>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start'>
        {/* First Column - Company Info */}
        <div className='space-y-10'>
          <div>
            <div className='text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide'>
              <Link href='/'>
                {footerContent.companyInfo?.logo ? (
                  <img 
                    src={`/api/proxy?url=${encodeURIComponent(`https://admin.vvworx.com${footerContent.companyInfo.logo}`)}`}
                    alt={footerContent.companyInfo?.name || 'Company Logo'}
                    className='h-20 w-auto object-contain'
                  />
                ) : (
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
                )}
              </Link>
            </div>
            <p className='uppercase text-sm tracking-widest'>
              {footerContent.companyInfo?.name}
            </p>
            {footerContent.companyInfo?.description && (
              <p className='mt-2 text-sm opacity-90'>
                {footerContent.companyInfo.description}
              </p>
            )}
          </div>
          
          {/* Social Media Links */}
          <div className='mt-20'>
            <p className='mb-2'>{footerContent.socialLinks?.followText || 'Follow Us:'}</p>
            <div className='flex space-x-4 items-center'>
              {activeSocialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-white text-[#6210FF] w-10 h-10 flex items-center justify-center rounded-full text-xl hover:scale-110 transition'>
                  <FontAwesomeIcon icon={getSocialIcon(link.platform)} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Second Column - Navigation Menu */}
        <div className='flex flex-col space-y-3 text-white font-medium text-xl'>
          {activeNavigationLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className='text-white hover:opacity-80 transition-opacity'>
              {link.text}
            </Link>
          ))}
        </div>

        {/* Third Column - Office Locations */}
        <div className='space-y-2 text-white font-medium text-lg'>
          {activeOfficeLocations.map((location, index) => (
            <div key={index} className='group relative pb-4'>
              <div
                className='flex items-center text-3xl justify-between border-b border-white/60 pb-2 cursor-pointer'
                onClick={() => toggleLocation(location.city.toLowerCase())}>
                <span>{location.city}</span>
              </div>
              <div
                className={`${
                  activeLocation === location.city.toLowerCase() ? 'max-h-40' : 'max-h-0'
                } overflow-hidden transition-all duration-500 text-white mt-1 md:group-hover:max-h-40`}>
                <p>{location.address.line1}</p>
                {location.address.line2 && <p>{location.address.line2}</p>}
                {location.address.line3 && <p>{location.address.line3}</p>}
                <p>{location.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}