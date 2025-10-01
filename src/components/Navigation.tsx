import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "Dashboard", key: "dashboard" },
    { path: "/publications", label: "Publications", key: "publications" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="nav-container pt-5">
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => handleNavigation(item.path)}
          className={`nav-link ${
            location.pathname === item.path ? "nav-link-active" : "nav-link-inactive"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;