import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function Hello() {
  return <p>Hello, React!</p>;
}
function Bye() {
  return <p>Goodbye, React!</p>;
}

function App() {
  return (
    <div>
      <Hello />
      <Bye />
    </div>
  );
}

export default App;
