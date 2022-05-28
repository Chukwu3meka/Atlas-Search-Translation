import { removeErrorAction, catchErr } from "./error";

export const setSessionAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_SESSION", payload });
      await dispatch(removeErrorAction("SET_SESSION"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_SESSION");
    }
  };
};

export const setTokenAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_TOKEN", payload });
      await dispatch(removeErrorAction("SET_TOKEN"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_TOKEN");
    }
  };
};

export const setUserDataAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_USER_DATA", payload });
      await dispatch(removeErrorAction("SET_USER_DATA"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_USER_DATA");
    }
  };
};
