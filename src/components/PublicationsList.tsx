import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchingPublications from "./Loading";

interface Publication {
  id: number;
  title: string;
  date_year: string;
  date_month?: string;
  category?: { id: number; title: string };
  subcategory?: { id: number; title: string };
  summary_of_abstract: string;
}

const PublicationsList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [publications, setPublications] = useState<Publication[]>([]);
  const [sortBy, setSortBy] = useState("new");
  const [loading, setLoading] = useState(false);

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const categoryFilter = searchParams.get("category");
  const subCategoryFilter = searchParams.get("subCategory");
  const fromYear = searchParams.get("from")
    ? parseInt(searchParams.get("from")!)
    : null;
  const toYear = searchParams.get("to")
    ? parseInt(searchParams.get("to")!)
    : null;

  const sortedPublications = [...publications].sort((a, b) => {
    const dateA = new Date(`${a.date_year || "2000"}`);
    const dateB = new Date(`${b.date_year || "2000"}`);
    return sortBy === "new"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  const filteredPublications = sortedPublications.filter((pub) => {
    // Category filter
    if (categoryFilter && pub.category?.title !== categoryFilter) {
      return false;
    }
    // SubCategory filter
    if (subCategoryFilter && pub.subcategory?.title !== subCategoryFilter) {
      return false;
    }
    // Year range filter
    if (fromYear && parseInt(pub.date_year) < fromYear) {
      return false;
    }
    if (toYear && parseInt(pub.date_year) > toYear) {
      return false;
    }
    return true;
  });

  const handlePublicationClick = (id: number) => {
    navigate(`/publication/${id}`);
  };

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://www.syfuddhin.com/api/publications?skip=0&limit=50"
        );
        if (!response.ok) throw new Error("Fetching failed!");
        const result = await response.json();
        setPublications(result?.publications || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPublications();
  }, []);

  return (
    <div className="pub-list-container">
      <header className="pub-list-header">
        <h1 className="pub-list-title">Publications</h1>
        <p className="pub-list-subtitle">
          Explore cutting-edge research in space science and biology
        </p>
        <div className="pub-sort">
          <label htmlFor="sortSelect" className="pub-sort-label">
            Sort by year:
          </label>
          <select
            id="sortSelect"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pub-sort-select"
          >
            <option value="old">Old to New</option>
            <option value="new">New to Old</option>
          </select>
        </div>
      </header>

      <div className="publications">
        {loading ? (
          <SearchingPublications/>
        ) : filteredPublications.length > 0 ? (
          filteredPublications.map((publication) => (
            <div
              key={publication.id}
              className="publication-item"
              onClick={() => handlePublicationClick(publication.id)}
            >
              <h2 className="publication-item-title">{publication.title}</h2>
              <p className="publication-item-description line-clamp-3 text-sm text-slate-200 my-2">
                {publication.summary_of_abstract}
              </p>
              <span className="publication-item-date">
                {publication.date_month} {publication.date_year}
              </span>
              <div className="publication-tags">
                {publication.category && (
                  <span className="tag bg-blue-600">
                    {publication.category.title}
                  </span>
                )}
                {publication.subcategory && (
                  <span className="tag bg-green-600">
                    {publication.subcategory.title}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white/60 mt-6">
            No publications found with current filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicationsList;
