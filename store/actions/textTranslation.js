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

// payload is the translation ID
export const upvoteTranslationAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UPVOTE_TRANSLATION", payload });
      await dispatch(removeErrorAction("UPVOTE_TRANSLATION"));
    } catch (err) {
      return catchErr(dispatch, err, "UPVOTE_TRANSLATION");
    }
  };
};

// payload is the translation ID
export const downvoteTranslationAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DOWNVOTE_TRANSLATION", payload });
      await dispatch(removeErrorAction("DOWNVOTE_TRANSLATION"));
    } catch (err) {
      return catchErr(dispatch, err, "DOWNVOTE_TRANSLATION");
    }
  };
};
