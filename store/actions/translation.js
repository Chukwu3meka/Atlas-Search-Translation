import { removeErrorAction, catchErr } from "./error";

export const setTextTranslationAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_TEXT_TRANSLATION", payload });
      await dispatch(removeErrorAction("SET_TEXT_TRANSLATION"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_TEXT_TRANSLATION");
    }
  };
};
