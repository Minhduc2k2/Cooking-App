import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import { projectFireStore } from "../../firebase/config";
import "./Recipe.css";
function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const { mode } = useTheme();

  //? Normal
  // useEffect(() => {
  //   setIsPending(true);
  //   projectFireStore
  //     .collection("recipes")
  //     .doc(id)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         setRecipe(doc.data());
  //         setIsPending(false);
  //       } else {
  //         setError("Recipe not found");
  //         setIsPending(false);
  //       }
  //     });
  // }, [id]);

  //? Real Time Collection data
  useEffect(() => {
    setIsPending(true);
    const unsub = projectFireStore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setRecipe(doc.data());
          setIsPending(false);
        } else {
          setError("Recipe not found");
          setIsPending(false);
        }
      });
    return () => unsub();
  }, [id]);
  
  const handleUpload = () => {
    projectFireStore
      .collection("recipes")
      .doc(id)
      .update({ title: "Uploaded Title" });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="Loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Take {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button className="btn" onClick={handleUpload}>
            Upload
          </button>
        </>
      )}
    </div>
  );
}

export default Recipe;
