import { useState } from "react";
import { Range } from "react-range";
import { useNavigate } from "react-router-dom";

// ধরো তোমার props এ DB থেকে data আসছে
interface SubCategory {
  id: number;
  title: string;
  description: string;
  image: string;
  category_id: number;
}

interface Category {
  id: number;
  title: string;
  description: string;
  image: string;
  subcategories: SubCategory[];
}

interface PublicationsSectionProps {
  categoriesData: Category[];
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ categoriesData }) => {
  const [categoryTitle, setCategoryTitle] = useState<string>(""); // এখন title রাখব
  const [subCategoryTitle, setSubCategoryTitle] = useState<string>("");
  const [years, setYears] = useState<[number, number]>([2000, 2025]); // [min, max]

  const navigate = useNavigate();

  // Selected category বের করতে title দিয়ে খুঁজব
  const selectedCategory = categoriesData.find((cat) => cat.title === categoryTitle);
  const subCategories = selectedCategory ? selectedCategory.subcategories : [];

  const handleVisitPublications = () => {
    const searchParams = new URLSearchParams();

    if (categoryTitle) searchParams.append("category", categoryTitle);
    if (subCategoryTitle) searchParams.append("subCategory", subCategoryTitle);
    searchParams.append("from", years[0].toString());
    searchParams.append("to", years[1].toString());

    // Navigate to publications page with query params
    navigate(`/publications?${searchParams.toString()}`);
  };

  return (
    <section className="space-section">
      <h2 className="text-center mb-4 text-primary text-2xl font-semibold">
        Visit Publications
      </h2>

      <div className="filters flex flex-wrap justify-between items-center gap-4">
        {/* Category */}
        <select
          value={categoryTitle}
          onChange={(e) => {
            setCategoryTitle(e.target.value || "");
            setSubCategoryTitle(""); // নতুন category change হলে subCategory reset
          }}
          className="space-select"
        >
          <option value="">Select Category</option>
          {categoriesData.map((cat) => (
            <option key={cat.id} value={cat.title}>
              {cat.title}
            </option>
          ))}
        </select>

        {/* Sub-category */}
        <select
          value={subCategoryTitle}
          onChange={(e) => setSubCategoryTitle(e.target.value || "")}
          className="space-select"
          disabled={!selectedCategory}
        >
          <option value="">Select Sub-category</option>
          {subCategories.map((subCat) => (
            <option key={subCat.id} value={subCat.title}>
              {subCat.title}
            </option>
          ))}
        </select>

        {/* Dual Range Slider */}
        <div className="flex flex-col items-center w-64">
          <span className="text-light-blue text-sm mb-2">
            {years[0]} - {years[1]}
          </span>
          <Range
            step={1}
            min={2000}
            max={2025}
            values={years}
            onChange={(values) => setYears(values as [number, number])}
            renderTrack={({ props, children }) => {
              const { ...restProps } = props;
              return (
                <div
                  {...restProps}
                  className="h-2 w-full rounded"
                  style={{
                    background: `linear-gradient(to right, 
                      #374151 0%, 
                      #374151 ${((years[0] - 2000) / (2025 - 2000)) * 100}%, 
                      #3b82f6 ${((years[0] - 2000) / (2025 - 2000)) * 100}%, 
                      #3b82f6 ${((years[1] - 2000) / (2025 - 2000)) * 100}%, 
                      #374151 ${((years[1] - 2000) / (2025 - 2000)) * 100}%, 
                      #374151 100%)`,
                  }}
                >
                  {children}
                </div>
              );
            }}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-5 w-5 rounded-full bg-blue-400 shadow-md cursor-pointer"
              />
            )}
          />
        </div>

        {/* Button */}
        <button onClick={handleVisitPublications} className="space-button">
          Visit Publications
        </button>
      </div>
    </section>
  );
};

export default PublicationsSection;
