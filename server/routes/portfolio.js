const express = require("express");
const router = express.Router();
const portfolioCtrl = require("../controllers/portfolio");
const authService = require("../services/auth");

router.post(
  "/",
  authService.checkJwt,
  authService.checkRole("siteOwner"),
  portfolioCtrl.savePortfolio
);

router.get(
  "/",
  authService.checkJwt,
  authService.checkRole("siteOwner"),
  portfolioCtrl.getPortfolios
);

router.patch(
  "/:id",
  authService.checkJwt,
  authService.checkRole("siteOwner"),
  portfolioCtrl.updatePortfolios
);

router.delete(
  "/:id",
  authService.checkJwt,
  authService.checkRole("siteOwner"),
  portfolioCtrl.deletePortfolios
);

module.exports = router;
