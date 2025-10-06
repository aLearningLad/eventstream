const crypto = require("crypto");

const generateKey = () => {
  return crypto.randomBytes(32).toString("hex"); // 64-character hex string
};

module.exports = generateKey;
