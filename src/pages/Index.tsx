import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import PublicationsSection from "@/components/PublicationsSection";
import ResearchCategories from "@/components/ResearchCategories";
import AnalyticsSection from "@/components/AnalyticsSection";
import { useEffect, useState } from "react";

const Index = () => {
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
      const fetchPublications = async () => {
        try {
          const response = await fetch(`https://www.syfuddhin.com/api/categories?skip=0&limit=100`);
          if (!response.ok) throw new Error("Fetching failed!");
          const result = await response.json();
          setCategories(result)
          console.log(categories)
        } catch (error) {
          console.error(error);
        }
      };
      fetchPublications();
    }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header />
      
      <div className="space-container">
        <PublicationsSection categoriesData={categories} />
        <ResearchCategories />
        <AnalyticsSection />
      </div>
    </div>
  );
};

export default Index;
