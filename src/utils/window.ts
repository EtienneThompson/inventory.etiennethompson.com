import queryString from "query-string";

export const extractQueryParam = (key: string): any => {
  let params = queryString.parse(window.location.search);
  let value = params[key];
  if (value) {
    if (Array.isArray(value)) {
      return value[0];
    } else {
      return value;
    }
  } else {
    return undefined;
  }
};
