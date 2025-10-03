import { Search, Leaf } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/publications?q=${searchQuery}`);
  };

  return (
    <header className="text-center py-8">
      <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
        <Leaf className="w-8 h-8" />
        SpaceBio Explorer
      </h1>
      <p className="text-light-blue mb-6">
        Exploring space biology data for the NASA Space App Challenge
      </p>

      <div className="flex justify-center mb-6">
        <div className="flex">
          <input
            type="text"
            placeholder="Search space biology data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="space-input w-80"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} className="space-search-button">
            <Search className="w-4 h-4 inline mr-2" />
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
