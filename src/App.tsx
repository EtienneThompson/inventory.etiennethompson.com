import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Outlet } from "react-router-dom";
import { Container } from "./components/common/Grid";
import { Toolbar } from "./components/common/Toolbar";
import { readFromLocalStorage } from "./utils/localStorage";
import { LocalStorageKey } from "./types";
import { login, logout } from "./store/actions";
import "./App.scss";

function App() {
  document.title = "Etienne Thompson - Inventory System";
  document.documentElement.className = "theme-light";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const clientId = readFromLocalStorage(LocalStorageKey.ClientId);
    const isUser = readFromLocalStorage(LocalStorageKey.IsUser) === "true";
    const isAdmin = readFromLocalStorage(LocalStorageKey.IsAdmin) === "true";
    if (clientId && isUser && isAdmin) {
      dispatch(login(clientId, isUser, isAdmin));
    }
  }, [dispatch]);

  const onLogoutButtonClicked = () => {
    dispatch(logout());
    navigate("/logout?reason=0");
  };

  return (
    <div className="App">
      <Container>
        <Toolbar onLogoutButtonClicked={onLogoutButtonClicked} />
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
