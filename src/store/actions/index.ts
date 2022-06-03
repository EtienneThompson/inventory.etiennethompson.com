import { AnyAction } from "redux";
import { store } from "../store";
import {
  writeToLocalStorage,
  deleteFromLocalStorage,
} from "../../utils/localStorage";
import { LocalStorageKey } from "../../types";
import { SystemState } from "../types";

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

export const setCurrentState = (newState: SystemState): AnyAction => {
  return {
    type: "currentState/set",
    payload: newState,
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
