import { AssetProvider } from "@/contexts/AssetProvider";
import { AppWithAssets, defaultContent } from "./sx";
export const dynamic = 'force-dynamic';


async function fetchServicesContent() {
  try {
    const response = await fetch('http://localhost:8000/api/services-content/active', {
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
