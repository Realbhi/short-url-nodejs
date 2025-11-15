const jwt = require("jsonwebtoken");
const jwt_secret = "Dont.win@2025";

function setUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  // this returns a token
  return jwt.sign(payload, jwt_secret);
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, jwt_secret);
}

module.exports = {
  setUser,
  getUser,
};
