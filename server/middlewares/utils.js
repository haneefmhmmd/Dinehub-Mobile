const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create token with userId and roleId
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

// Validate token
const requireToken = () => (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  } else {
    token = req.cookies.token;
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      } else {
        req.loginId = decodedToken.id;
        next();
      }
    });
  } else {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
};

module.exports = { createToken, requireToken };
