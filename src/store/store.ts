import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { InventoryStore } from "./types";
import rootReducer from "./reducers";

export const initialState: InventoryStore = {
  isLoading: false,
  clientId: undefined,
  isUser: false,
  isAdmin: false,
  isLoggedIn: false,
};

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools()
);
