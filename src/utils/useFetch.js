// provides a hook to use an authenticated fetch API outside of redux
import { useSelector } from "react-redux";
import fetch from "./fetch";

const useFetch = () => {
  const { token } = useSelector(({ app }) => app);

  return (url, options = { method: "GET" }) => {
    if (options.headers) {
      options.headers["x-access-token"] = token;
    } else {
      options.headers = { "x-access-token": token };
    }

    // TODO: handle unauthenticated API
    // ie. if session expired, redirect user to login page

    return fetch(url, options);
  };
};

export default useFetch;
