import { Link } from "react-router-dom";
import "./RecipeList.css";
function RecipeList({ recipes }) {
  if (recipes.length === 0) {
    return <div className="error">Recipe not found.</div>;
  }
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div className="card" key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipe/${recipe.id}`}>Cook this</Link>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
