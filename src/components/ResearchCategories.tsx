import { User, Leaf, Zap, Dna, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResearchCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      icon: User,
      title: "Human",
      apiName: "Human", 
      description: "Space biology research",
      color: "text-primary"
    },
    {
      icon: Leaf,
      title: "Plant",
      apiName: "Plant",
      description: "Plant biology in space",
      color: "text-green-400"
    },
    {
      icon: Zap,
      title: "Microbiology",
      apiName: "Microbiology",
      description: "Microbial research",
      color: "text-yellow-400"
    },
    {
      icon: Dna,
      title: "Genomics",
      apiName: "Genomics & Multi-omics", 
      description: "Genetic analysis",
      color: "text-purple-400"
    },
    {
      icon: Cpu,
      title: "Technologies",
      apiName: "Technology & Methods", 
      description: "Space biology tech",
      color: "text-cyan-400"
    }
  ];

  const handleCategoryClick = (apiName: string) => {
    navigate(`/publications?category=${encodeURIComponent(apiName)}`);
  };

  return (
    <section className="space-section">
      <h2 className="text-center mb-6 text-primary text-2xl font-semibold">
        Research Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.title}
              className="space-card cursor-pointer"
              onClick={() => handleCategoryClick(category.apiName)}
            >
              <IconComponent
                className={`w-7 h-7 ${category.color} mb-3 mx-auto`}
              />
              <h3 className="text-lg font-semibold mb-1">{category.title}</h3>
              <p className="text-sm text-lighter-blue">{category.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ResearchCategories;
