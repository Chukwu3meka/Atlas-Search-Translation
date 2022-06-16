const layoutReducer = (state = { pageReady: false }, { payload, type }) => {
  switch (type) {
    case "DISPLAY_SIDEBAR":
      return { ...state, displaySidebar: payload };
    case "PAGE_READY":
      return { ...state, pageReady: payload };
    default:
      return state;
  }
};

export default layoutReducer;
