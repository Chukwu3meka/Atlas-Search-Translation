const translationReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case "SET_TEXT_TRANSLATION":
      return { ...state, textTranslation: payload };
    default:
      return state;
  }
};

export default translationReducer;
