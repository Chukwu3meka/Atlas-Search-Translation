const initialState = {
  translating: false,
  suggestAnEdit: false, // <= enable/disable suggestion
  translation: {}, // <= translation object from database
  goodTranslations: [], // <=  ID list of all translations i've voted
  poorTranslations: [], // <=  ID list of all translations i've voted
};

const translationReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case "SET_TRANSLATION":
      return { ...state, translation: payload };
    case "SET_TRANSLATING":
      return { ...state, translating: payload };
    case "UPVOTE_TRANSLATION":
      return { ...state, goodTranslations: [...state.goodTranslations, payload] };
    case "DOWNVOTE_TRANSLATION":
      return { ...state, poorTranslations: [...state.poorTranslations, payload] };
    case "SUGGEST_AN_EDIT":
      return { ...state, suggestAnEdit: payload };
    default:
      return state;
  }
};

export default translationReducer;
