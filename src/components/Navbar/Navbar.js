import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import "./Navbar.css";
import useTheme from "../../hooks/useTheme";

function Navbar() {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ backgroundColor: color }}>
      <nav>
        <Link to="/" className="brand">
          <h2>Cooking App</h2>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}

export default Navbar;
