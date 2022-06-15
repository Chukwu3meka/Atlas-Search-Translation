import { removeErrorAction, catchErr } from "./error";

export const setAuthAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_AUTH", payload });
      await dispatch(removeErrorAction("SET_AUTH"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_AUTH");
    }
  };
};
