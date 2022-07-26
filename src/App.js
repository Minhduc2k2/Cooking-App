import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Create from "./pages/create/Create";
import Home from "./pages/home/Home";
import Recipe from "./pages/recipe/Recipe";
import Search from "./pages/search/Search";
import Navbar from "./components/Navbar/Navbar";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";
import useTheme from "./hooks/useTheme";
function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <Navbar />
      <ThemeSelector />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
