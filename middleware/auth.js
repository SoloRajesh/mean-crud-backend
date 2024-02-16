const jwt = require("jsonwebtoken");
const userModel = require("../src/customer/userModel");

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1]

    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    jwt.verify(token, "rajesh", (err, user) => {
      if (err) {
        console.log(err, "err")
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = auth;
