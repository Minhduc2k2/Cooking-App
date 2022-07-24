import { Link } from "react-router-dom";
import "./RecipeList.css";
function RecipeList({ recipes }) {
  return recipes.map((recipe) => (
    <div className="card" key={recipe.id}>
      <h3>{recipe.title}</h3>
      <p>{recipe.cookingTime} to make</p>
      <div>{recipe.method.substring(0, 100)}...</div>
      <Link to={`/recipe/${recipe.id}`}>Cook this</Link>
    </div>
  ));
}

export default RecipeList;
