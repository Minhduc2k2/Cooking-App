# Firebase

```cmd
npm install firebase@8.5
```

## Config

```js
import firebase from "firebase/app";
import "firebase/firestore";

//TODO: Get firebaseConfig from website
const firebaseConfig = {
  apiKey: "AIzaSyBazULmDCrkt09RHLi5NpHhPG-H8ppGtRk",
  authDomain: "cooking-site-8b23b.firebaseapp.com",
  projectId: "cooking-site-8b23b",
  storageBucket: "cooking-site-8b23b.appspot.com",
  messagingSenderId: "364781764132",
  appId: "1:364781764132:web:e46667bac9e2699e6ca2b1",
};

//TODO: Initialize Firebase
firebase.initializeApp(firebaseConfig);

//TODO: Initialize Services
const projectFireStore = firebase.firestore();

export { projectFireStore };
```

## Get data

```js
useEffect(() => {
  setIsPending(true);
  projectFireStore
    .collection("recipes")
    .get()
    .then((snapshot) => {
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
    })
    .catch((error) => {
      setError(error.message);
    });
}, []);
```

## Get data by ID

```js
useEffect(() => {
  setIsPending(true);
  projectFireStore
    .collection("recipes")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setRecipe(doc.data());
        setIsPending(false);
      } else {
        setError("Recipe not found");
        setIsPending(false);
      }
    });
}, [id]);
```

## Post data

```js
const handleSubmit = async (e) => {
  e.preventDefault();
  const doc = {
    title,
    ingredients,
    method,
    cookingTime: cookingTime + " minutes",
  };

  try {
    await projectFireStore.collection("recipes").add(doc);
    //TODO: Redirect to Home Page when user added recipe
    navigate("/", { replace: true });
  } catch (err) {
    console.log(err);
  }
};
```

## Delete data

```js
const handleDelete = (id) => {
  projectFireStore.collection("recipes").doc(id).delete();
};
```

## Put Data

```js
const handleUpload = () => {
  projectFireStore
    .collection("recipes")
    .doc(id)
    .update({ title: "Uploaded Title" });
};
```

## Real Time Collection Data

```js
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
```
