const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const namespace = "http://localhost:3000/";

exports.checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: "https://dev-udiktky2.auth0.com/.well-known/jwks.json",
    // requestHeaders: {}, // Optional
    jwksRequestsPerMinute: 10, // Default value
    requestAgentOptions: {}, // Optional
    // timeout: ms("30s"), // Defaults to 30s
    // proxy: "[protocol]://[username]:[pass]@[address]:[port]", // Optional
  }),
  audience: "AyjiNJgMky3Q3Qf04XjHwm3YRWtr6GEX",
  issuer: "https://dev-udiktky2.auth0.com/",
  algorithm: ["RS256"],
});

//-----------------MIDDLEWARE FOR CHECKING ROLE------------------
exports.checkRole = (role) => (req, res, next) => {
  const user = req.user;
  if (user && user[namespace + "roles"] === role) {
    next();
  } else {
    res.status(401).send({ title: "not authorized " });
  }
};
