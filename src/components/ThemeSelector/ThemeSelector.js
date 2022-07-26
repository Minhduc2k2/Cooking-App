import "./ThemeSelector.css";
import useTheme from "../../hooks/useTheme";
import modeIcon from "../../assets/mode-icon.svg";
const themeColor = ["#f16c20", "#1395ba", "#0d3c55"];

function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();
  const toggleMode = () => {
    changeMode(mode === "light" ? "dark" : "light");
    console.log(mode);
  };
  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          alt="mode"
          onClick={toggleMode}
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>
      <div className="theme-buttons">
        {themeColor.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
