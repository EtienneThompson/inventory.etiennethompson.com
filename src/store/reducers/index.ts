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

const setBreadcrumb = (state: InventoryStore, action: AnyAction) => {
  switch (action.type) {
    case "breadcrumb/set":
      return action.payload;
  }

  return state.breadcrumb;
};

export default function rootReducer(
  state: InventoryStore = initialState,
  action: AnyAction
) {
  return {
    isLoading: setIsLoading(state, action),
    clientId: setClientId(state, action),
    isUser: setIsUser(state, action),
    isAdmin: setIsAdmin(state, action),
    isLoggedIn: setIsLoggedIn(state, action),
    breadcrumb: setBreadcrumb(state, action),
  };
}
