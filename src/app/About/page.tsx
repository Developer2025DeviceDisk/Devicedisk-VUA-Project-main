import { AboutPageClient, AboutPageContent, defaultContent } from "./main";
import type { Metadata } from "next";
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "AI Branding Services Agnecy, AI Design Services Agency at Dubai, Mumbai, Pune",
  description: "VVWorx is a creative ai branding agency offering ai branding & design, ai logo design services, and ai graphic design solutions. We build ai-powered brand identity with a strong ai brand strategy, helping businesses achieve future-ready branding with ai.",
  keywords:"ai branding & design, ai branding agency, ai brand strategy, ai logo design services, ai graphic design solutions, creative ai branding company, ai-powered brand identity, future-ready branding with ai"

};


// Fetch about page content server-side
async function getAboutContent(): Promise<AboutPageContent> {
  try {
    const response = await fetch(
      "https://admin.vvworx.com/api/about-page-content/active"
    );
    const result = await response.json();

    if (result.success && result.data) {
      return result.data;
    } else {
      console.log("Using default about content");
      return defaultContent;
    }
  } catch (error) {
    console.error("Error fetching about content:", error);
    console.log("Using default about content");
    return defaultContent;
  }
}

export default async function AboutPage() {
  const aboutContent = await getAboutContent();
  
  return <AboutPageClient aboutContent={aboutContent} />;
}