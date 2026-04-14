import Footer from './Footer';
export const dynamic = 'force-dynamic';

// TypeScript interfaces (duplicated for clarity)
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

// Fetch footer content from API (SSR)
async function getFooterContent(): Promise<FooterContent> {
  // Default content fallback
  const getDefaultFooterContent = (): FooterContent => ({
    companyInfo: {
      name: 'Voix & Vision Worx',
      logo: '', // Empty string will fall back to SVG
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

  try {
    const [footerResponse, contactResponse] = await Promise.all([
      fetch('https://admin.vvworx.com/api/footer-content/active', {
        next: { revalidate: 60 },
      }),
      fetch('https://admin.vvworx.com/api/contact-content/active', {
        next: { revalidate: 60 },
      })
    ]);
    
    const footerResult = await footerResponse.json();
    let finalContent = getDefaultFooterContent();

    if (footerResult.success && footerResult.data) {
      finalContent = { ...finalContent, ...footerResult.data };
    } else {
      console.log('Using default footer content:', footerResult.message);
    }

    if (contactResponse.ok) {
      const contactResult = await contactResponse.json();
      if (contactResult.success && contactResult.data?.mapSection?.locations) {
        // Map contact content locations to footer format
        const mappedLocations: OfficeLocation[] = contactResult.data.mapSection.locations.map((loc: any) => ({
          city: loc.city,
          isActive: loc.isActive,
          phone: loc.phone,
          order: loc.order,
          address: {
            line1: loc.address[0] || '',
            line2: loc.address[1] || '',
            line3: loc.address.slice(2).join(', ') || ''
          }
        }));
        
        finalContent.officeLocations = mappedLocations;
      }
    }

    return finalContent;
  } catch (error) {
    console.error('Error fetching footer or contact content:', error);
    return getDefaultFooterContent();
  }
}

export default async function FooterWrapper() {
  const footerContent = await getFooterContent();
  return <Footer content={footerContent} />;
}