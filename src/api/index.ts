import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { store } from "../store/store";
import { logout } from "../store/actions";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  timeout: 60000,
});

instance.interceptors.request.use(
  (req: AxiosRequestConfig) => {
    if (req.method === "get") {
      if (!req.params) {
        req.params = {};
      }
      req.params.appid = process.env.REACT_APP_APPLICATION_ID;
      req.params.clientid = store.getState().clientId;
    } else {
      let data;
      if (typeof req.data === "string") {
        data = JSON.parse(req.data);
      } else if (req.data instanceof FormData) {
        data = req.data;
        data.append("appid", process.env.REACT_APP_APPLICATION_ID as string);
        data.append("clientid", store.getState().clientId as string);
        return req;
      } else {
        data = req.data;
      }
      data.appid = process.env.REACT_APP_APPLICATION_ID;
      data.clientid = store.getState().clientId;
      req.data = data;
    }
    return req;
  },
  (err) => {
    Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    return res;
  },
  (err) => {
    if (
      err.response.status === 400 &&
      err.response.data.message ===
        "Your session has expired. Please login again."
    ) {
      store.dispatch(logout());
      return (window.location.href = "/logout?reason=1");
    } else if (err.response.status === 401) {
      // return (window.location.href = "/logout?reason=0");
    }
    return Promise.reject(err);
  }
);

export default instance;
