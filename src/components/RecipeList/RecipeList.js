import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import "./RecipeList.css";
import { projectFireStore } from "../../firebase/config";
import closeIcon from "../../assets/icons8-close.svg";
function RecipeList({ recipes }) {
  const { mode } = useTheme();
  const handleDelete = (id) => {
    projectFireStore.collection("recipes").doc(id).delete();
  };
  if (recipes.length === 0) {
    return <div className="error">Recipe not found.</div>;
  }
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div className={`card ${mode}`} key={recipe.id}>
          <img
            className="closeicon"
            src={closeIcon}
            alt="close"
            onClick={() => handleDelete(recipe.id)}
          />
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
