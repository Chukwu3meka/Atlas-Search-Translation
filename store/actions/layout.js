import { removeErrorAction, catchErr } from "./error";

export const displaySidebarAction = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload);
      dispatch({ type: "DISPLAY_SIDEBAR", payload });
      await dispatch(removeErrorAction("DISPLAY_SIDEBAR"));
    } catch (err) {
      return catchErr(dispatch, err, "DISPLAY_SIDEBAR");
    }
  };
};
