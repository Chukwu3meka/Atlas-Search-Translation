const router = require("express").Router(),
  routeHandler = require("../handlers/textTranslations"),
  headerAuthWare = require("../middleware/headerAuth");

router.route("/searchTranslation").post(routeHandler.searchTranslation);
router.route("/suggestTranslation").post(routeHandler.suggestTranslation);
router.route("/starter").post(routeHandler.starter);

module.exports = router;
