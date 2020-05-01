const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
require("dotenv").config();

const config = {
  env: {
    AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  },
};
module.exports = withCSS(withSass(config));
