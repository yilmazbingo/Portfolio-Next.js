const express = require("express");
const router = express.Router();

const blogCtrl = require("../controllers/blog");
const authService = require("../services/auth");

router.post(
  "/",
  authService.checkJwt,
  authService.checkRole("siteOwner"),
  blogCtrl.createBlog
);

//-------/me shoudl come before /:id---------------
//specific routes always before the generic
router.get(
  "/me",
  authService.checkJwt,
  authService.checkRole("siteOwner"),
  blogCtrl.getUserBlogs
);
router.get("/:id", blogCtrl.getBlogById);

router.patch(
  "/:id",
  authService.checkJwt,
  authService.checkRole("siteOwner"),
  blogCtrl.updateBlog
);

module.exports = router;
