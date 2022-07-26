import { useEffect, useState } from "react";
import RecipeList from "../../components/RecipeList/RecipeList";
import { projectFireStore } from "../../firebase/config";
import "./Home.css";
function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  //? Normal
  // useEffect(() => {
  //   setIsPending(true);
  //   projectFireStore
  //     .collection("recipes")
  //     .get()
  //     .then((snapshot) => {
  //       if (snapshot.empty) {
  //         setError("No Recipes to Load");
  //         setIsPending(false);
  //       } else {
  //         let result = [];
  //         snapshot.docs.forEach((doc) => {
  //           result.push({ id: doc.id, ...doc.data() });
  //         });
  //         setData(result);
  //         setIsPending(false);
  //       }
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }, []);

  //?Real Time Collection Data
  //TODO: Lắng nghe sự kiện thay đổi ở Snapshot => Khi Snapshot bị thay đổi thì function này sẽ được gọi lại
  //TODO: Sau khi listen chúng ta cần unsubscribe nó đi, tránh việc đã ra khỏi component rồi mà hàm listen vẫn chạy làm tốn tài nguyên máy không cần thiết
  useEffect(() => {
    setIsPending(true);
    const unsub = projectFireStore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No Recipes to Load");
          setIsPending(false);
        } else {
          let result = [];
          snapshot.docs.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
          });
          setData(result);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );
    return () => unsub();
  }, []);
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}

export default Home;
