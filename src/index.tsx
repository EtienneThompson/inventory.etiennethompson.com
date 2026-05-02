import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { ItemView } from "./pages/ItemView";
import { FolderView } from "./pages/FolderView";
import { store } from "./store/store";
import Memo from "./utils/memoization";
import "./index.scss";
import { Error404 } from "./pages/404Error";

const memo = new Memo();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="item/:itemid" element={<ItemView memo={memo} />} />
          <Route
            path="folder/:folderid"
            element={<FolderView memo={memo} />}
          />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
