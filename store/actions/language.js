import { removeErrorAction, catchErr } from "./error";

export const setSourceLanguageAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_SOURCE_LANGUAGE", payload });
      await dispatch(removeErrorAction("SET_SOURCE_LANGUAGE"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_SOURCE_LANGUAGE");
    }
  };
};

export const setTranslationLanguageAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_TRANSLATION_LANGUAGE", payload });
      await dispatch(removeErrorAction("SET_TRANSLATION_LANGUAGE"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_TRANSLATION_LANGUAGE");
    }
  };
};
