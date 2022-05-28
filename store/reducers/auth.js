const authReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case "SET_SESSION":
      return { ...state, session: payload };
    case "SET_TOKEN":
      return { ...state, token: payload };
    default:
      return state;
  }
};

export default authReducer;
