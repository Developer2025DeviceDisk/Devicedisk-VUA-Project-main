import { AssetProvider } from "@/contexts/AssetProvider";
import type { Metadata } from "next";
import { AppWithAssets, defaultContent } from "./sx";
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "AI Calling Agent and AI Film Production Services, VVWorx Dubai, Mumbai, Pune",
  description: "VVWorx offers ai calling agent services to automate customer engagement and ai film production services for high-quality branded content. Serving Dubai, Mumbai & Pune.",
  other: {
    keywords: "ai calling agent mumbai, ai calling services dubai, ai customer engagement solutions india, ai film production service mumbai, ai video production company dubai, ai-generated film production, creative ai video services, ai content production agency",
  },
};

async function fetchServicesContent() {
  try {
    const response = await fetch('https://admin.vvworx.com/api/services-content/active', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    return defaultContent;
  } catch (error) {
    console.warn('Failed to load services content from API, using default:', error);
    return defaultContent;
  }
}

export default async function MyApp() {
  const servicesContent = await fetchServicesContent();
  
  return (
    <AssetProvider>
      <AppWithAssets servicesContent={servicesContent} />
    </AssetProvider>
  );
}
