const authReducer = (state = null, { payload, type }) => {
  switch (type) {
    case "SET_AUTH":
      return payload;
    default:
      return state;
  }
};

export default authReducer;
