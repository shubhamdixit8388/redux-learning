import axios from "axios";

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type !== "api") {
      return; // next(action); return; //return next(action)
    }

    const { url, method, data, onSuccess, onError } = action.payload;
    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api/",
        url,
        data,
        method,
      });
      dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      dispatch({ type: onError, payload: error });
    }
  };

export default api;
