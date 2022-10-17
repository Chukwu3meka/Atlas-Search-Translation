import { combineReducers } from "redux";

import auth from "./auth";
import error from "./error";
import layout from "./layout";
import language from "./language";
import textTranslation from "./textTranslation";

export default combineReducers({
  auth,
  error,
  layout,
  language,
  textTranslation,
});
