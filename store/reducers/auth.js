const authReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case "SET_USER_DATA":
      return { ...payload };
    default:
      return state;
  }
};

export default authReducer;
