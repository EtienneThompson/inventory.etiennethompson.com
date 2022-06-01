import { AnyAction } from "redux";
import { store } from "../store";
import {
  writeToLocalStorage,
  deleteFromLocalStorage,
} from "../../utils/localStorage";
import { LocalStorageKey } from "../../types";

export const setIsLoading = (status: boolean): AnyAction => {
  return {
    type: "loading/set",
    payload: status,
  };
};

export const updateClientId = (newClientId: string | undefined): AnyAction => {
  return {
    type: "clientId/set",
    payload: newClientId,
  };
};

export const updateIsUser = (isUser: boolean): AnyAction => {
  return {
    type: "userStatus/setIsUser",
    payload: isUser,
  };
};

export const updateIsAdmin = (isAdmin: boolean): AnyAction => {
  return {
    type: "userStatus/setIsAdmin",
    payload: isAdmin,
  };
};

export const setLoginStatus = (loginStatus: boolean): AnyAction => {
  return {
    type: "login/set",
    payload: loginStatus,
  };
};

export const login = (
  clientId: string,
  isUser: boolean,
  isAdmin: boolean
): AnyAction => {
  writeToLocalStorage(LocalStorageKey.ClientId, clientId);
  store.dispatch(updateClientId(clientId));
  writeToLocalStorage(LocalStorageKey.IsUser, isUser);
  store.dispatch(updateIsUser(isUser));
  writeToLocalStorage(LocalStorageKey.IsAdmin, isAdmin);
  store.dispatch(updateIsAdmin(isAdmin));
  return setLoginStatus(true);
};

export const logout = (): AnyAction => {
  deleteFromLocalStorage(LocalStorageKey.ClientId);
  store.dispatch(updateClientId(undefined));
  deleteFromLocalStorage(LocalStorageKey.IsUser);
  store.dispatch(updateIsUser(false));
  deleteFromLocalStorage(LocalStorageKey.IsAdmin);
  store.dispatch(updateIsAdmin(false));
  return setLoginStatus(false);
};

export const updateBreadcrumb = (name: string, value: string) => {
  let currBreadcrumb = [...store.getState().breadcrumb];
  if (
    !currBreadcrumb[0].includes(name) &&
    !currBreadcrumb[1].includes(value)
  ) {
    // Add the elements if they are not already in the breadcrumb trail.
    currBreadcrumb[0].push(name);
    currBreadcrumb[1].push(value);
  } else if (
    currBreadcrumb[0].includes(name) &&
    currBreadcrumb[1].includes(value)
  ) {
    // Element is in the list, so need to pop from the breadcrumb until we have
    // this element at the top.
    while (
      currBreadcrumb[0][currBreadcrumb[0].length - 1] !== name &&
      currBreadcrumb[1][currBreadcrumb[1].length - 1] !== value
    ) {
      currBreadcrumb[0].pop();
      currBreadcrumb[1].pop();
    }
  }

  return {
    type: "breadcrumb/set",
    payload: currBreadcrumb,
  };
};
