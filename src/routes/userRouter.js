const router = require("express").Router();
const userCtr = require("../controlers/userCtr");

router.get("/getUsers", userCtr.getUsers);
router.post("/mRole", userCtr.modifyPermissions);
router.post("/delete/:_id", userCtr.deleteUser);
module.exports = router;
