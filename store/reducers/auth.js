// const authReducer = (state = {}, { payload, type }) => {
const authReducer = (state = null, { payload, type }) => {
  switch (type) {
    case "SET_AUTH":
      if (payload && typeof payload === "object" && !Array.isArray(payload) && payload !== null) {
        return { ...payload };
      } else {
        return {};
      }
    default:
      return state;
  }
};

export default authReducer;
