const initialState = {
  id: null,
  source: "",
  translation: "",
  goodTranslations: [],
  poorTranslations: [],
};

const translationReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case "SET_TEXT_TRANSLATION":
      return {
        ...state,
        id: payload.id,
        source: payload.source,
        translation: payload.translation,
      };
    case "UPVOTE_TRANSLATION":
      // payload is translationID
      return { ...state, goodTranslations: [...state.goodTranslations, payload] };
    case "DOWNVOTE_TRANSLATION":
      // payload is translationID
      return { ...state, poorTranslations: [...state.poorTranslations, payload] };
    default:
      return state;
  }
};

export default translationReducer;
