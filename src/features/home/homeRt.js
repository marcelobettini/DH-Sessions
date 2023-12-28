const router = require("express").Router();
const homeCt = require("./homeCt.js");
router.get("/", homeCt.renderIndex);
module.exports = router;
