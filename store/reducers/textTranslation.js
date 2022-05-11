const initialState = {
  source: "", // <= source text
  id: null, // <= _id of current translation
  suggestAnEdit: false, // <= enable/disable suggestion
  translation: "", // <= best translation for source text
  goodTranslations: [], // <=  list of all translations i've voted
  poorTranslations: [], // <=  list of all translations i've voted
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
    case "SUGGEST_AN_EDIT":
      // payload is either true/false
      return { ...state, suggestAnEdit: payload };
    default:
      return state;
  }
};

export default translationReducer;
