import Navigation from "@/components/Navigation";
import PublicationsList from "@/components/PublicationsList";

const Publications = () => {
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PublicationsList />
    </div>
  );
};

export default Publications;