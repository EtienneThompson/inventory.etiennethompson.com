import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "./components/common/Grid";
import { Toolbar } from "./components/common/Toolbar";
import "./App.scss";

function App() {
  document.title = "Etienne Thompson - Inventory System";
  document.documentElement.className = "theme-light";

  return (
    <Container>
      <Toolbar />
      <Outlet />
    </Container>
  );
}

export default App;
