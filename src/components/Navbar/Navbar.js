import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
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
