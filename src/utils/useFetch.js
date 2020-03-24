// provides a hook to use an authenticated fetch API outside of redux
import { useSelector } from "react-redux";
import fetch from "./fetch";

const useFetch = () => {
  const { token } = useSelector(({ app }) => app);

  return (url, options = {}) => {
    // TODO: handle unauthenticated API
    // ie. if session expired, redirect user to login page
    const mergedOptions = {
      method: 'GET',
      ...options,
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    }

    return fetch(url, mergedOptions);
  };
};

export default useFetch;
