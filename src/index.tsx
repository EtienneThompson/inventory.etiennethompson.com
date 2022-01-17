import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { ItemView } from "./pages/ItemView";
import { FolderView } from "./pages/FolderView";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import Memo from "./utils/memoization";
import "./index.scss";

// Instantiate global memo object that can be passed to pages as needed.
let memo = new Memo();

ReactDOM.render(
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
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
