import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="AppContainer">
      <div className="description">
        <p className="gameTitle SU">SU</p>
        <p className="gameTitle DO">DO</p>
        <p className="gameTitle KU">KU</p>
        <p className="gameFeature">SOLVER</p>
      </div>
      <Game />
    </div>
  );
}

export default App;
