const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

const blogCtrl = require("../controllers/blog");
const authService = require("../services/auth");

router.get("", blogCtrl.getBlogs);

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

// router.delete(
//   "/:id",
//   authService.checkJWT,
//   authService.checkRole("siteOwner"),
//   blogCtrl.deleteBlog
// );

router.delete(
  "/:id",
  authService.checkJwt,
  authService.checkRole("siteOwner"),
  async (req, res) => {
    const blogId = req.params.id;

    try {
      await Blog.findByIdAndDelete(blogId);
      res.json({ status: "deleted" });
    } catch (e) {
      console.log("error in blogsssssssss", e.message);
    }
  }
);
module.exports = router;
