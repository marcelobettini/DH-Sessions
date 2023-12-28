const router = require("express").Router();
const authCt = require("./authCt.js");
router.get("/login", authCt.loginForm);
router.post("/login", authCt.loginProcess);
router.get("/register", authCt.registerForm);
router.post("/register", authCt.registerProcess);
router.get("/logout");
module.exports = router;
