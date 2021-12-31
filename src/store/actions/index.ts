import { AnyAction } from "redux";
import { store } from "../store";

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
  store.dispatch(updateClientId(clientId));
  store.dispatch(updateIsUser(isUser));
  store.dispatch(updateIsAdmin(isAdmin));
  return setLoginStatus(true);
};

export const logout = (): AnyAction => {
  store.dispatch(updateClientId(undefined));
  store.dispatch(updateIsUser(false));
  store.dispatch(updateIsAdmin(false));
  return setLoginStatus(false);
};
