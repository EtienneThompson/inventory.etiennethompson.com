import React from "react";
import { Outlet } from "react-router-dom";
import { Toolbar } from "./components/common/Toolbar";
import "./App.scss";

function App() {
  document.title = "Etienne Thompson - Inventory System";
  document.documentElement.className = "theme-light";

  return (
    <div className="App">
      <Toolbar />
      <Outlet />
    </div>
  );
}

export default App;
