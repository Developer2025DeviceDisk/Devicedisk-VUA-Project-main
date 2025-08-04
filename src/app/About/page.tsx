import { AboutPageClient, AboutPageContent, defaultContent } from "./main";
export const dynamic = 'force-dynamic';


// Fetch about page content server-side
async function getAboutContent(): Promise<AboutPageContent> {
  try {
    const response = await fetch(
      "http://15.206.84.81:8000/api/about-page-content/active"
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