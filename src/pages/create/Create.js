import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./Create.css";
function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const navigate = useNavigate();

  const { postData, data, isPending } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );

  const ingredientInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients([...ingredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  //TODO: Redirect to Home Page when user added recipe
  useEffect(() => {
    if (data) {
      // navigate("../success", { replace: true });
      navigate("/", { replace: true });
    }
  }, data);

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            value={title}
            type={"text"}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </label>
        <p>
          Current recipe:
          {ingredients.map((ing) => (
            <em key={ing}>{ing}, </em>
          ))}
        </p>
        <label>
          <span>Recipe method:</span>
          <textarea
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Recipe Cooking Time:</span>
          <input
            type={"number"}
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            required
          />
        </label>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

export default Create;
