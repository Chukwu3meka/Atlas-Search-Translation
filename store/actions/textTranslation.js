import { removeErrorAction, catchErr } from "./error";

export const setTranslatingAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_TRANSLATING", payload });
      await dispatch(removeErrorAction("SET_TRANSLATING"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_TRANSLATING");
    }
  };
};

export const setTranslationAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_TRANSLATION", payload });
      await dispatch(removeErrorAction("SET_TRANSLATION"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_TRANSLATION");
    }
  };
};

export const setSourceTextAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_SOURCE_TEXT", payload });
      await dispatch(removeErrorAction("SET_SOURCE_TEXT"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_SOURCE_TEXT");
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

// payload is either true/false
export const enableSuggestAnEditAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SUGGEST_AN_EDIT", payload });
      await dispatch(removeErrorAction("SUGGEST_AN_EDIT"));
    } catch (err) {
      return catchErr(dispatch, err, "SUGGEST_AN_EDIT");
    }
  };
};
