import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { InventoryStore, SystemState } from "./types";
import rootReducer from "./reducers";

export const initialState: InventoryStore = {
  isLoading: false,
  clientId: undefined,
  isUser: false,
  isAdmin: false,
  isLoggedIn: false,
  currentState: SystemState.Viewing,
};

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools()
);
