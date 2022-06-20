const jwt = require("jsonwebtoken");

let generateToken = (user, secretSinanture, tokenLife) => {
  return new Promise((resolve, reject) => {
    const userData = {
      _id: user._id,
      username: user.username,
      role: user.role,
    };
    jwt.sign(
      { data: userData },
      secretSinanture,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        return resolve(token);
      }
    );
  });
};
let verifyToken = (BearToken, secretKey) => {
  const token = BearToken.replace(/^Bearer\s/, "");
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      return resolve(decoded);
    });
  });
};
module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};
