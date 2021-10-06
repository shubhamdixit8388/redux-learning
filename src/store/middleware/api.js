import axios from "axios";
import * as actions from "../api";

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type !== actions.apiCallBegan.type) {
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
      // General
      dispatch(actions.apiCallSuccess(response.data));
      // Specific
      dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // General
      dispatch(actions.apiCallFailed(error));
      // Specific
      if (onError) dispatch({ type: onError, payload: error });
    }
  };

export default api;
