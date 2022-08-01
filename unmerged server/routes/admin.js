const router = require("express").Router(),
  routeHandler = require("../handlers/admin"),
  headerAuthWare = require("../middleware/headerAuth");

router.route("/fetchTextSuggestion").post(headerAuthWare, routeHandler.fetchTextSuggestion);
router.route("/approveSuggestion").post(routeHandler.approveSuggestion);
router.route("/rejectSuggestion").post(routeHandler.rejectSuggestion);
router.route("/starter").post(routeHandler.starter);

module.exports = router;
