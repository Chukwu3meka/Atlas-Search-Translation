const languageReducer = (state = { sourceLanguage: "English", translationLanguage: "French" }, { payload, type }) => {
  switch (type) {
    case "SET_TRANSLATION_LANGUAGE":
      return { ...state, translationLanguage: payload };
    case "SET_SOURCE_LANGUAGE":
      return { ...state, sourceLanguage: payload };
    default:
      return state;
  }
};

export default languageReducer;
