import React from 'react';
import Image from 'next/image';
import ContactForm from './ContactForm';
import ClientMapWrapper from './ClientMapWrapper';

// TypeScript interfaces for dynamic content
interface ContactContent {
  heroSection?: {
    title: string;
    description: string;
    formSectionTitle: string;
  };
  servicesList?: string[];
  servicesLabel?: string;
  servicesSubtext?: string;
  mapSection?: {
    title: string;
    locations?: Array<{
      cx: number;
      cy: number;
      city: string;
      address: string[];
      phone: string;
      id: string;
      order: number;
      isActive: boolean;
    }>;
  };
  jobSection?: {
    title: string;
    subtitle: string;
    openings: string[];
    contactText: string;
    contactEmail: string;
  };
  styling?: {
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
  };
}

// Fetch content at build time (SSR)
async function getContactContent(): Promise<ContactContent> {
  try {
    const response = await fetch('https://admin.vvworx.com/api/contact-content/active', {
      // Add cache revalidation for ISR (Incremental Static Regeneration)
     cache: 'no-store'
    });
    
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        // Debug: Log the actual data structure
        console.log('Fetched contact content:', JSON.stringify(result.data, null, 2));
        return result.data;
      }
    }
  } catch (error) {
    console.error('Error fetching contact content:', error);
  }

  // Return default content if API fails
  return {
    heroSection: {
      title: 'Reach Us',
      description: 'At Voix & Vision Worx, we are dedicated to transforming your aspirations into tangible achievements. We partner with businesses to navigate complex challenges and unlock new possibilities, leveraging our expertise to deliver innovative and impactful solutions. Our commitment is to your success, helping you connect, engage, and grow in an ever-evolving landscape. Contact us today to explore how our collaborative approach can help achieve your strategic goals.',
      formSectionTitle: 'I am interested in'
    },
    servicesList: [
      'Strategy',
      'Branding & Design',
      'Content & Production',
      'Digital Marketing',
      'Agent Vua',
      'Agent Vision',
      'Agent XR'
    ],
    servicesLabel: 'Services',
    servicesSubtext: '(Select at least one)',
    mapSection: {
      title: 'Our Presence',
      locations: [
        {
          cx: 1087.93,
          cy: 361.869,
          city: "Mumbai",
          address: [
            "Unit No 711, A Wing",
            "Centrum Business Square",
            "Road No 16, Wagle Estate",
            "Thane(W) - 400604"
          ],
          phone: "+91 877 96 32312",
          id: "mumbai",
          order: 1,
          isActive: true
        },
        {
          cx: 985.556,
          cy: 330.369,
          city: "Dubai",
          address: [
            "14th Floor, Office No 1402",
            "Burjuman Business Tower",
            "Burjuman, Dubai"
          ],
          phone: "+971 56 189 9800",
          id: "dubai",
          order: 2,
          isActive: true
        },
        {
          cx: 1103.68,
          cy: 367.381,
          city: "Pune",
          address: [
            "Office 3B, 2nd Floor",
            "Building 3, Cerebrum IT Park",
            "Kalyaninagar, 411032"
          ],
          phone: "+91 797 67 48422",
          id: "pune",
          order: 3,
          isActive: true
        }
      ]
    },
    jobSection: {
      title: 'Looking For VUA Filling',
      subtitle: 'Current Opening',
      openings: [
        'Brand Manager',
        'UI Designer',
        'Marketing Intern',
        'Senior Designer',
        'Animator',
        'Business Development'
      ],
      contactText: 'Work With Us:',
      contactEmail: 'hr@vvworx.com'
    },
    styling: {
      backgroundColor: '#EEF0FF',
      primaryColor: '#6210FF',
      secondaryColor: '#BE2FF4',
      textColor: '#000000'
    }
  };
}

// Server-side rendered page component
export default async function ContactUsPage() {
  // Fetch content at build/request time
  const content = await getContactContent();
  
  // Debug: Log content structure in server console
  console.log('Server - Content received:', {
    heroSection: content.heroSection,
    mapSection: content.mapSection,
    jobSection: content.jobSection,
    styling: content.styling,
    servicesLabel: content.servicesLabel,
    servicesSubtext: content.servicesSubtext,
    servicesList: content.servicesList?.slice(0, 3) // Just first 3 for brevity
  });

  // Split job openings for layout (first 3, remaining 4+)
  const openings = content.jobSection?.openings || [];
  const topThree = openings.slice(0, 3);
  const bottomFour = openings.slice(3);

  // Dynamic colors with fallbacks
  const backgroundColor = content.styling?.backgroundColor || '#EEF0FF';
  const primaryColor = content.styling?.primaryColor || '#6210FF';
  const secondaryColor = content.styling?.secondaryColor || '#BE2FF4';


  console.log('content :', content)

  return (
    <>
      <div 
        className='relative min-h-screen pb-6 pt-[120px] py-12 px-8 md:px-20'
        style={{ backgroundColor }}
      >
        <h1 
          className='text-[55px] md:text-[94.5px] petrovsans-book text-center bg-gradient-to-r text-transparent bg-clip-text'
          style={{ 
            backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` 
          }}
        >
          {content.heroSection?.title || 'Reach Us'}
        </h1>
        <p 
          className='text-center text-[10px] md:text-[20px] md:max-w-[1176px] outfit-light leading-[149%] tracking-[0.08em] mx-auto mt-6'
          style={{ color: primaryColor }}
        >
          {content.heroSection?.description || 'At Voix & Vision Worx, we are dedicated to transforming your aspirations into tangible achievements.'}
        </p>
        <div className='mt-16 grid md:max-w-[1176px] md:grid-cols-2 gap-10 items-start'>
          <div>
            <h2 
              className='text-[40px] md:text-[51px] petrovsans-book text-center md:text-start mb-6'
              style={{ color: primaryColor }}
            >
              {content.heroSection?.formSectionTitle || 'I am interested in'}
            </h2>
          </div>
          <ContactForm content={content} />
        </div>
      </div>

      <div 
        className='relative min-h-screen py-12'
        style={{ backgroundColor }}
      >
        <div className='mt-[79px]'>
          <h1 
            className='text-[55px] md:text-[94.5px] petrovsans-book text-center'
            style={{ color: primaryColor }}
          >
            {content.mapSection?.title || 'Our Presence'}
          </h1>
        </div>
        <div className='mt-16 flex justify-center w-full'>
          <div className='w-full md:w-[100%]'>
            <ClientMapWrapper locations={content.mapSection?.locations} />
          </div>
        </div>
      </div>

      <div 
        className='px-6 py-16 md:py-24 text-center'
        style={{ backgroundColor }}
      >
        <h1 
          className='text-[40px] max-sm:px-20 md:text-[94.5px] petrovsans-book leading-tight'
          style={{ color: primaryColor }}
        >
          {content.jobSection?.title || 'Looking For VUA Filling'}
        </h1>

        <h2 
          className='mt-[18px] md:mt-[41px] text-[24px] md:text-[31.5px] petrovsans-semibold text-black'
        >
          {content.jobSection?.subtitle || 'Current Opening'}
        </h2>

        <div className='mt-[18px] md:mt-[41px] max-w-4xl mx-auto hidden md:flex flex-col gap-4'>
          <div className='flex justify-center gap-4'>
            {topThree.map((role, index) => (
              <span
                key={index}
                className='group border text-black px-4 rounded-full outfit-light text-sm md:text-base'
                style={{ borderColor: primaryColor }}
              >
                <span 
                  className='group-hover:bg-gradient-to-r group-hover:text-transparent group-hover:bg-clip-text transition'
                  style={{ 
                    '--tw-gradient-stops': `${primaryColor}, ${secondaryColor}` 
                  } as any}
                >
                  {role}
                </span>
              </span>
            ))}
          </div>

          <div className='flex justify-center gap-4'>
            {bottomFour.map((role, index) => (
              <span
                key={index + 3}
                className='group border text-black px-4 rounded-full outfit-light text-sm md:text-base'
                style={{ borderColor: primaryColor }}
              >
                <span 
                  className='group-hover:bg-gradient-to-r group-hover:text-transparent group-hover:bg-clip-text transition'
                  style={{ 
                    '--tw-gradient-stops': `${primaryColor}, ${secondaryColor}` 
                  } as any}
                >
                  {role}
                </span>
              </span>
            ))}
          </div>
        </div>

        <p className='mt-[72px] md:mt-[93px] text-[19px] petrovsans-book md:text-[23.62px] text-gray-800'>
          {content.jobSection?.contactText || 'Work With Us:'}{' '}
          <a
            href={`mailto:${content.jobSection?.contactEmail || 'hr@vvworx.com'}`}
            className='block md:inline text-[28.67px] petrovsans-semibold md:text-[35.44px] font-semibold'
            style={{ color: primaryColor }}
          >
            {content.jobSection?.contactEmail || 'hr@vvworx.com'}
          </a>
        </p>
      </div>
    </>
  );
}
