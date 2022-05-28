const authReducer = (state = { userData: {} }, { payload, type }) => {
  switch (type) {
    case "SET_SESSION":
      return { ...state, session: payload };
    case "SET_TOKEN":
      return { ...state, token: payload };
    case "SET_USER_DATA":
      return { ...state, userData: payload };
    default:
      return state;
  }
};

export default authReducer;
