const jwtHelper = require("../helpers/jwt.helper");
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "Thang_Dep_Trai_Khong_Ai_Sanh_Bang_:))";

let isAuth = async (req, res, next) => {
  const tokenFromClient =
    req.body.token ||
    req.query.token ||
    req.headers.authorization ||
    req.headers["x-access-token"];
  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient,
        accessTokenSecret
      );
      req.jwtDecoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};

let isAdmin = async (req, res, next) => {
  const tokenFromClient =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers.authorization;

  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient,
        accessTokenSecret
      );
      req.jwtDecoded = decoded;
      if (decoded.data.role === 1) {
        next();
      } else {
        return res.status(401).json({
          message: "You are not authorized to perform this action!",
        });
      }
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};
module.exports = {
  isAuth: isAuth,
  isAdmin: isAdmin,
};
