import { combineReducers } from "redux";

import error from "./error";
import layout from "./layout";
import language from "./language";
import textTranslation from "./textTranslation";

export default combineReducers({
  error,
  layout,
  language,
  textTranslation,
});
