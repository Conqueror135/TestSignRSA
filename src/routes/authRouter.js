const router = require("express").Router();
const AuthControler = require("../controlers/authCtr");
router.post("/login", AuthControler.login);
router.post("/register", AuthControler.register);
router.post("/refreshToken", AuthControler.refreshToken);
module.exports = router;
