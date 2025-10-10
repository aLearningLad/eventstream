const { rateLimit } = require("express-rate-limit");

const auth_limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message:
    "Too many requests. You need to wait 15 minutes before trying to sign in again",
  statusCode: 429,
});

module.exports = auth_limiter;
