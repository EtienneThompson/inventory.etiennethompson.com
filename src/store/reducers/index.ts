import { AnyAction } from "@reduxjs/toolkit";
import { initialState } from "../store";
import { InventoryStore } from "../types";

const setIsLoading = (state: InventoryStore, action: AnyAction) => {
  switch (action.type) {
    case "loading/set":
      return action.payload;
  }

  return state.isLoading;
};

const setChangingElement = (state: InventoryStore, action: AnyAction) => {
  switch (action.type) {
    case "loading/element":
      return action.payload;
  }

  return state.changingElement;
};

const setClientId = (state: InventoryStore, action: AnyAction) => {
  switch (action.type) {
    case "clientId/set":
      return action.payload;
  }

  return state.clientId;
};

const setIsUser = (state: InventoryStore, action: AnyAction) => {
  switch (action.type) {
    case "userStatus/setIsUser":
      return action.payload;
  }

  return state.isUser;
};

const setIsAdmin = (state: InventoryStore, action: AnyAction) => {
  switch (action.type) {
    case "userStatus/setIsAdmin":
      return action.payload;
  }

  return state.isUser;
};

const setIsLoggedIn = (state: InventoryStore, action: AnyAction) => {
  switch (action.type) {
    case "login/set":
      return action.payload;
  }

  return state.isLoggedIn;
};

const setCurrentState = (state: InventoryStore, action: AnyAction) => {
  switch (action.type) {
    case "currentState/set":
      return action.payload;
  }

  return state.currentState;
};

export default function rootReducer(
  state: InventoryStore = initialState,
  action: AnyAction
) {
  return {
    isLoading: setIsLoading(state, action),
    changingElement: setChangingElement(state, action),
    clientId: setClientId(state, action),
    isUser: setIsUser(state, action),
    isAdmin: setIsAdmin(state, action),
    isLoggedIn: setIsLoggedIn(state, action),
    currentState: setCurrentState(state, action),
  };
}
