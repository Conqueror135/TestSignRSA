const router = require("express").Router();

const authRouter = require("./authRouter");
const pkiRouter = require("./pkiRouter");
const userRouter = require("./userRouter");
const authMiddleware = require("../middleware/authMiddleware");

router.use("/app", authRouter);
router.use(authMiddleware.isAuth);
router.use("/pki", pkiRouter);
router.use("/user", userRouter);
module.exports = router;
