const router = require("express").Router();
const moviesCt = require("./moviesCt.js");
router.get("/", moviesCt.getAll);
router.post("/"); //add one
module.exports = router;
