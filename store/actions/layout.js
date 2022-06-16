import { removeErrorAction, catchErr } from "./error";

export const displaySidebarAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DISPLAY_SIDEBAR", payload });
      await dispatch(removeErrorAction("DISPLAY_SIDEBAR"));
    } catch (err) {
      return catchErr(dispatch, err, "DISPLAY_SIDEBAR");
    }
  };
};

export const setPageReadyAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "PAGE_READY", payload });
      await dispatch(removeErrorAction("PAGE_READY"));
    } catch (err) {
      return catchErr(dispatch, err, "PAGE_READY");
    }
  };
};
