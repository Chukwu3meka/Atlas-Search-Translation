const layoutReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case "DISPLAY_SIDEBAR":
      return { ...state, displaySidebar: payload };
    default:
      return state;
  }
};

export default layoutReducer;
