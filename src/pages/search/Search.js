import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList/RecipeList";
import "./Search.css";
import useTheme from "../../hooks/useTheme";
function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const url = "http://localhost:3000/recipes?q=" + query;

  const { data, isPending, error } = useFetch(url);
  const { mode } = useTheme();
  return (
    <div>
      <h2 className={`page-title ${mode}`}>Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}

export default Search;
