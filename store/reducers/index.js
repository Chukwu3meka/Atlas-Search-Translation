import { combineReducers } from "redux";

import error from "./error";
import layout from "./layout";
import language from "./language";
import translation from "./translation";

export default combineReducers({
  error,
  layout,
  language,
  translation,
});
